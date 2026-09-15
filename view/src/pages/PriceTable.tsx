import { useContext, useMemo, useState, type FC } from "react";
import type { PagedQuery, Price } from "../types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import AlertContext from "../context/AlertContext";
import DynamicTable from "../components/DynamicTable";
import { Link as _Link } from "react-router";
import styled from "styled-components";
import Pager from "../components/Pager";

const Link = styled(_Link)`
  font-size: 64px;
`;

const PriceTable: FC = () => {
  const showAlert = useContext(AlertContext);
  const [pageNo, setPageNo] = useState(1);
  const queryClient = useQueryClient();

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

  const jointPriceEntries = useMemo(() => prices?.content.map((item) => {
    const joint = { 
      ...item,
      priceRange: `${item.priceLower} - ${item.priceUpper}`,
    }
    delete joint.priceLower;
    delete joint.priceUpper;
    return joint;
  }), [prices]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    showAlert("Cannot retrieve prices", "", true);
  }

  return (
    <div className="slight-margin">
      <h1>Price Table</h1>
      <DynamicTable
        items={jointPriceEntries || []}
        onRowSelect={() => {}}
      />
      <Pager
        state={{ pageNo, totalPages: prices?.totalPages || 1 }}
        onPageChange={(no) => {
          setPageNo(no);
          queryClient.invalidateQueries();
        }}
      />
      <br />
      <h1><Link to="/contact">Contact us</Link> for more information.</h1>
    </div>
  );
};

export default PriceTable;