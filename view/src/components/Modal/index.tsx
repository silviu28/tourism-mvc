import type { Dispatch, FC, ReactNode } from "react"
import styled from "styled-components";
import { Backdrop } from "../styled";

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

  li {
    background-color: white;
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