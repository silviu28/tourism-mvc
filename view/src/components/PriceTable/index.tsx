import { useContext, type FC } from "react";
import type { Price } from "../../types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AlertContext from "../../AlertContext";
import "./style.css";

const EmptyRow: FC = () => {
  return (
    <tr>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
    </tr>
  );
};

const PriceTable: FC = () => {
  const showAlert = useContext(AlertContext);

  const { data: prices = [], isLoading, isError } = useQuery<Price[]>({
    queryKey: ["prices"],
    queryFn: async () => {
      try {
        const pricesRes = await axios.get("http://localhost:4004/api/prices");
        return pricesRes.data;
      } catch (error) {
        showAlert("Unable to load prices", "", true);
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
          {prices?.map(price =>
            <tr>
              <td>{price.country}</td>
              <td>{price.isAvailable ? "yes" : "no"}</td>
              <td>{price.travelHost}</td>
              <td>
                {(price.priceLower && price.priceUpper) &&
                  `${price.priceLower} - ${price.priceUpper}`}
              </td>
            </tr>)}
          {!prices.length && <EmptyRow />}
        </tbody>
      </table>
      <br />
    </div>
  );
};

export default PriceTable;