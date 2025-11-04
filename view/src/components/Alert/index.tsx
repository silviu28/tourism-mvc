import type { FC } from "react";
import "./style.css";

interface AlertProps {
  title: string;
  content: string;
  error: boolean;
};

const Alert: FC<AlertProps> = ({ title, content, error }) => {
  const style = {
    backgroundColor: error ? "rgba(247, 97, 97, .9)" : "rgba(92, 243, 92, .9)",
  };

  console.log({ title, content, error });

  if (!content) return;

  return (
    <div className="alert" style={style}>
      {(title && <h1>{title}</h1>)}
      <p>{content}</p>
    </div>
  );
};

export default Alert;