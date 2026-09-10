import type { FC } from "react";
import type { CommentData } from "../../types";

interface CommentProps {
  comment: CommentData,
  onLike?: () => void
};

const Comment: FC<CommentProps> = ({ comment, onLike }) => {
  return (
    <div className="container">
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