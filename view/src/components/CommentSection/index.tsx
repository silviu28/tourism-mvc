import { useContext, useState, type FC } from "react";
import UserContext from "../../UserContext";
import { type CommentData } from "../../types";
import axios from "axios";
import Comment from "../Comment";
import "./style.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AlertContext from "../../AlertContext";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:4004";

const CommentSection: FC = () => {
  const queryClient = useQueryClient();
  const [user] = useContext(UserContext);
  const showAlert = useContext(AlertContext);
  const [comment, setComment] = useState<string>("");

  const { data: comments = [], isLoading } = useQuery<CommentData[]>({
    queryKey: ["comments"],
    queryFn: async () => {
      try {
        const commentsRes = await axios.get("http://localhost:4004/api/comments");
        return commentsRes.data;
      } catch (error) {
        showAlert("Cannot display comments", "", true);
      }
    }
  });
  const { mutate } = useMutation({
    mutationFn: async (newComment: {
      username: string,
      comment: string
    }) => {
      try {
        setComment("");
        await axios.post("http://localhost:4004/api/comments", newComment, {
          withCredentials: true
        });
        queryClient.invalidateQueries({
          queryKey: ["comments"],
        });
      } catch (error) {
        showAlert("Unable to add your comment", "", true);
      }
    }
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="slight-margin, container">
      <p>{`Comments (${comments.length})`}</p>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          onChange={e => setComment(e.target.value)}
          style={{ width: '87%' }}
          placeholder={!user.username ? "Sign in to comment" : "Write something..."}
          disabled={!user.username}
        />
        <button
          onClick={() => mutate({ username: user.username, comment })}
          disabled={!user.username}>
          Send
        </button>
      </div>
      <div>
        {comments.map(comment =>
          <Comment
            key={comment.id}
            username={comment.user.username}
            comment={comment.comment}
          />)}
      </div>
    </div>
  );
};

export default CommentSection;