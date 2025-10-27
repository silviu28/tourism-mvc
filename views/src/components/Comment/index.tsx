import type { FC } from "react";

interface CommentProps {
  username: string,
  comment: string,
};

const style = {
  padding: '1vw',
  backgroundColor: 'black',
  margin: '.7vw',
  borderRadius: '.5vw',
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