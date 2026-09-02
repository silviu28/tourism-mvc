import { useState, type FC } from "react";
import { type CommentData, type UserData } from "../../types";
import axios from "axios";
import Comment from "../Comment";
import "./style.css";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:4004";

interface CommentSectionProps {
  comments: CommentData[],
  user?: UserData,
  onComment: (user: UserData, comment: string) => boolean
};

const CommentSection: FC<CommentSectionProps> = ({ comments, user, onComment }) => {
 
  const [comment, setComment] = useState<string>("");

  if (!user) return <div>User error</div>;

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
          onClick={() => {
            if (onComment(user, comment))
              setComment("");
          }}
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