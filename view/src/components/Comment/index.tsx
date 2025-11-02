import type { FC } from "react";

interface CommentProps {
  username: string,
  comment: string,
};

const style = {
  padding: '1vw',
  margin: '.7vw',
  border: "1px solid #ccc",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.05)"
};

const Comment: FC<CommentProps> = ({ username, comment }) => {
  return (
    <div style={style}>
      <h2>{username} says...</h2>
      <p>{comment}</p>
    </div>
  );
};

export default Comment;