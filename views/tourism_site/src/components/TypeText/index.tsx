import type { FunctionComponent } from "react";
import './style.css';

interface TypeTextProps {
  text: string,
}

const TypeText: FunctionComponent<TypeTextProps> = ({ text }) => {
  return (
    <div className="typing">
      <div className="type-text">{text}</div>
    </div>
  );
};

export default TypeText;