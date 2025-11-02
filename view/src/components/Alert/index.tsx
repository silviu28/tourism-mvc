import type { FC } from "react";

interface AlertProps {
  title: string;
  content: string;
  error: boolean;
};

const Alert: FC<AlertProps> = ({ title, content, error }) => {
  const style = {
    width: "80%",
    left: "10%",
    top: "5%",
    backgroundColor: error ? "red" : "green",
    zIndex: 1000,
  };

  console.log({ title, content, error });

  if (!content) return;

  return (
    <div style={style}>
      {(title && <h1>{title}</h1>)}
      <p>{content}</p>
    </div>
  );
};

export default Alert;