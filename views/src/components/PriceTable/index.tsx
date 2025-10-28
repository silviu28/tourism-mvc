import type { FC } from "react";
import type { Price } from "../../types";

interface PriceTableProps {
  prices: Price[],
};

const PriceTable: FC<PriceTableProps> = ({ prices }) => {
  return (
    <>
      <h1>Price Table</h1>
      <table width="100%">
        <tbody>
          <tr className={"pricetable"}>
            <th>Location</th>
            <th>Country</th>
            <th>Status</th>
            <th>Insurance</th>
            <th>Travel Host</th>
            <th>Pricing</th>
            {prices?.map(price =>
              <tr>
                <td>{price.location}</td>
                <td>{price.country}</td>
                <td>{price.status}</td>
                <td>{price.insurance}</td>
                <td>{price.travelHost}</td>
                <td>
                  {price.priceLower && price.priceUpper
                    ? `$${price.priceLower} - $${price.priceUpper}`
                    : "Unspecified"}
                </td>
              </tr>)}
          </tr>
        </tbody>
      </table>
      <br />
    </>
  );
};

export default PriceTable;