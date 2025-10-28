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
  const { id, username } = useContext<UserData>(UserContext);
  if (!id || !username) {
    return;
  }
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
    <div style={{ margin: "1vw" }}>
      <p>Comments</p>
      <input type="text" onChange={e => setComment(e.target.value)} />
      <button onClick={() => onSubmit({ id, username, comment })}>
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
      <script src="comment.js"></script>
    </div>
  );
};

export default CommentSection;