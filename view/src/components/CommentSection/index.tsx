import { useContext, useEffect, useState, type FunctionComponent } from "react";
import UserContext from "../../UserContext";
import { type CommentData, type UserData } from "../../types";
import axios from "axios";
import Comment from "../Comment";
import "./style.css";

interface CommentSectionProps {
  onSubmit: ({ id, username, comment }: { id: number, username: string, comment: string }) => Promise<void>;
};

const CommentSection: FunctionComponent<CommentSectionProps> = ({ onSubmit }) => {
  const user = useContext<UserData>(UserContext);
  const { username, id } = user;
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<CommentData[]>([]);

  useEffect(() => {
    async function fetch() {
      const res = await axios.get<CommentData[]>("http://localhost:4004/comments");
      if (res.data) {
        setComments(res.data);
      }
    }
    fetch();
  }, []);

  if (comments) console.log(comments);

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
        onClick={() => onSubmit({ id: id!, username: username!, comment })}
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