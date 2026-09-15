import type { FC } from "react";
import styled from "styled-components";

const AlertContainer = styled.div`
  position: fixed;
  justify-content: center;
  align-items: center;
  padding: 1%;
  width: 80%;
  left: 10%;
  top: 5%;
  z-index: 1000;
  pointer-events: none;
`;

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
    <AlertContainer style={style} data-testid="alert">
      {(title && <h1>{title}</h1>)}
      <p>{content}</p>
    </AlertContainer>
  );
};

export default Alert;