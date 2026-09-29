import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { EMPTY_QUERY_PAGE, type Feedback, type PagedQuery } from "../../types";
import { useContext, useState } from "react";
import AlertContext from "../../context/AlertContext";
import useInvalidatingRemove from "../../hooks/useInvalidatingRemove";
import DynamicTable from "../../components/DynamicTable";
import Pager from "../../components/Pager";

const ManageFeedback = () => {
  const showAlert = useContext(AlertContext);
  const remove = useInvalidatingRemove("feedback");
  const [selected, setSelected] = useState<Feedback | null>(null);
  const [pageNo, setPageNo] = useState(1);

  const { data: feedbackPage, isLoading: feedbackLoading } = useQuery<PagedQuery<Feedback>>({
    queryKey: ["feedback"],
    queryFn: async () => {
      try {
        const feedbackRes = await axios.get(`http://localhost:4004/api/feedback?page=${pageNo}`);
        return feedbackRes.data;
      } catch (_error) {
        showAlert("Unable to load feedback", "", true);
        return EMPTY_QUERY_PAGE;
      }
    }
  });

  return (
    <>
      <h1>View feedbacks sent by users</h1>
      <div className="container">
        {!feedbackLoading && (
          <>
            <DynamicTable
              items={feedbackPage?.content || []}
              onRowSelect={(item) => setSelected(item as Feedback)}
            />
            <Pager
              state={{ pageNo, totalPages: feedbackPage?.currentPage || 1 }}
              onPageChange={(no) => setPageNo(no)}
            />
          </>
        )}
        <button
          onClick={() => remove(selected as { id: number })}
          disabled={!selected}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default ManageFeedback;