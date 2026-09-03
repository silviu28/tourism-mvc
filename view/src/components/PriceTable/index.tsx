import { useContext, type FC } from "react";
import type { PagedQuery, Price } from "../../types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AlertContext from "../../AlertContext";
import "./style.css";

const PriceTable: FC = () => {
  const showAlert = useContext(AlertContext);

  const { data: prices, isLoading, isError } = useQuery<PagedQuery<Price>>({
    queryKey: ["prices"],
    queryFn: async () => {
      try {
        const pricesRes = await axios.get(`http://localhost:4004/api/prices?page=${1}`);
        return pricesRes.data;
      } catch (_error) {
        showAlert("Unable to load prices", "", true);
        return {

        } as PagedQuery<Price>;
      }
    }
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    showAlert("Cannot retrieve prices", "", true);
  }

  return (
    <div className="slight-margin">
      <h1>Price Table</h1>
      <table width="100%" className="pricetable">
        <tbody>
          <tr className="table-head">
            <th>Country</th>
            <th>Available?</th>
            <th>Travel Host</th>
            <th>Pricing</th>
          </tr>
          {prices?.content.map((price) =>
            <tr>
              <td>{price.country}</td>
              <td>{price.isAvailable ? "yes" : "no"}</td>
              <td>{price.travelHost}</td>
              <td>
                {(price.priceLower && price.priceUpper) &&
                  `${price.priceLower} - ${price.priceUpper}`}
              </td>
            </tr>)}
        </tbody>
      </table>
      <br />
    </div>
  );
};

export default PriceTable;