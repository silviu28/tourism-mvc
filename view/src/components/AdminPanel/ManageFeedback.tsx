import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Feedback } from "../../types";
import { useContext, useState } from "react";
import AlertContext from "../../AlertContext";
import useInvalidatingRemove from "../../hooks/useInvalidatingRemove";

const selectedStyle = {
  background: 'lightblue'
};

const ManageFeedback = () => {
  const showAlert = useContext(AlertContext);
  const remove = useInvalidatingRemove("feedback");
  const [selected, setSelected] = useState<Feedback | null>(null);

  const { data: feedback = [], isLoading: feedbackLoading } = useQuery<Feedback[]>({
    queryKey: ["feedback"],
    queryFn: async () => {
      try {
        const feedbackRes = await axios.get("http://localhost:4004/api/feedback");
        return feedbackRes.data;
      } catch (_error) {
        showAlert("Unable to load feedback", "", true);
      }
    }
  });

  return (
    <>
      <h1>View feedbacks sent by users</h1>
      <div className="container">
        {!feedbackLoading && (
          <ul>
            {feedback.map((fb) =>
              <li
                key={fb.id}
                style={fb === selected ? selectedStyle : {}}
                onClick={() => setSelected(fb)}>{fb.feedback}</li>)}
          </ul>
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