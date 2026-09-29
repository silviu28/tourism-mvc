import type { Dispatch, FC, ReactNode } from "react"
import styled from "styled-components";
import { Backdrop } from "./atoms";

const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  justify-content: center;
  align-items: center;
  padding: 5%;
  border: 1px solid #ccc;
  z-index: 10;
  @media (max-width: 1000px) {
    max-width: 100%;
    max-height: 100%;
    min-width: 80%;
    min-height: 40%;
  }
  
  li {
    background-color: white;
  }

  img {
    width: 90%;
    height: 90%;
  }
`;

interface ModalProps {
  isVisible: boolean;
  visibilitySetter: Dispatch<boolean>;
  children?: ReactNode;
};

const Modal: FC<ModalProps> = ({ isVisible, visibilitySetter, children }) => {
  if (!isVisible) return;

  return (
    <Backdrop>
      <ModalContainer>
        {children}
        <button onClick={() => visibilitySetter(false)}>
          Close
        </button>
      </ModalContainer>
    </Backdrop>
  );
};

export default Modal;