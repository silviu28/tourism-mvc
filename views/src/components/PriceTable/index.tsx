import type { FunctionComponent } from "react";

const PriceTable: FunctionComponent = () => {
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
          </tr>
          <tr className={"pricetable-oddline"}>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr className={"pricetable-oddline"}>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr className={"pricetable-oddline"}>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr className={"pricetable-oddline"}>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </tbody>
      </table>
      <br />
      <footer>Prices may not be final.</footer>
    </>
  );
};

export default PriceTable;