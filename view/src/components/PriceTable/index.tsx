import { useContext, type FC } from "react";
import type { Price } from "../../types";
import { useQuery } from "@tanstack/react-query";
import UserContext from "../../UserContext";
import axios from "axios";

interface PriceTableProps {
  prices: Price[],
};

const PriceTable: FC<PriceTableProps> = () => {
  const [, , setAlert] = useContext(UserContext);

  const { data: prices = [], isLoading } = useQuery<Price[]>({
    queryKey: ["prices"],
    queryFn: async () => {
      try {
        const pricesRes = await axios.get("http://localhost:4004/prices");
        return pricesRes.data;
      } catch (error) {
        setAlert("Unable to load prices", "", true);
      }
    }
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Price Table</h1>
      <table width="100%">
        <tbody>
          <tr className={"pricetable"}>
            <th>Country</th>
            <th>Available?</th>
            <th>Status</th>
            <th>Insurance</th>
            <th>Travel Host</th>
            <th>Pricing</th>
          </tr>
          {prices?.map(price =>
            <tr>
              <td>{price.country}</td>
              <td>{price.isAvailable ? "yes" : "no"}</td>
              <td>{price.status}</td>
              <td>{price.insurance}</td>
              <td>{price.travelHost}</td>
              <td>
                {(price.priceLower && price.priceUpper) &&
                  `${price.priceLower} - ${price.priceUpper}`}
              </td>
            </tr>)}
        </tbody>
      </table>
      <br />
    </>
  );
};

export default PriceTable;