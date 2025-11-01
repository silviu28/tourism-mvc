import { useContext, useState, type FunctionComponent } from "react";
import UserContext from "../../UserContext";
import { type CommentData } from "../../types";
import axios from "axios";
import Comment from "../Comment";
import "./style.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface CommentSectionProps {
  onSubmit: ({ id, username, comment }: { id: number, username: string, comment: string }) => Promise<void>;
};

const CommentSection: FunctionComponent<CommentSectionProps> = ({ onSubmit }) => {
  const queryClient = useQueryClient();
  const [user, , showAlert] = useContext(UserContext);
  const { username, id } = user;
  const [comment, setComment] = useState<string>("");

  const { data: comments = [], isLoading } = useQuery<CommentData[]>({
    queryKey: ["comments"],
    queryFn: async () => {
      try {
        const commentsRes = await axios.get("http://localhost:4004/comments");
        return commentsRes.data;
      } catch (error) {
        showAlert("Cannot display comments", true);
      }
    }
  });
  const { mutate } = useMutation({
    mutationFn: async (newComment: {
      id: number,
      username: string,
      comment: string
    }) => {
      try {
        setComment("");
        await axios.post("http://localhost:4004/comments", newComment);
        queryClient.invalidateQueries({
          queryKey: ["comments"],
        });
      } catch (error) {
        showAlert("Unable to add your comment", true);
      }
    }
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="slight-margin">
      <p>Comments</p>
      <input
        type="text"
        onChange={e => setComment(e.target.value)}
        style={{ width: '87%' }}
        placeholder={!user.id ? "Sign in to comment" : ""}
        disabled={!user.id}
      />
      <button
        onClick={() => mutate({ id: id!, username: username!, comment })}
        disabled={!user.id}>
        Send
      </button>
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