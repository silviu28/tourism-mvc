import type { FC } from "react";
import type { CommentData } from "../../types";

interface CommentProps {
  comment: CommentData,
  onLike?: () => void
};

const style = {
  padding: '1vw',
  margin: '.7vw',
  border: "1px solid #ccc",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)"
};

const Comment: FC<CommentProps> = ({ comment, onLike }) => {
  return (
    <div style={style}>
      <h2>{comment.user.username} says...</h2>
      <p>{comment.comment}</p>
      {onLike && (
        <>
          {comment.likes} <button onClick={onLike}>Like</button>
        </>
      )}
    </div>
  );
};

export default Comment;