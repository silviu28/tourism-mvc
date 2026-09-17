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

  li {
    background-color: white;
  }
`;

interface ModalProps {
  isVisible: boolean;
  visibilitySetter: Dispatch<boolean>;
  options?: {
    name: string;
    onClick: () => void;
  }[],
  children?: ReactNode;
};

const Modal: FC<ModalProps> = ({ isVisible, visibilitySetter, options, children }) => {
  if (!isVisible) return;

  return (
    <Backdrop>
      <ModalContainer>
        {children}
        {options
          ? <>
            {options.map(({ name, onClick }) => 
              <button 
                onClick={onClick}
                id={`opt-${name}`}
              >{name}</button>
            )}
          </>
          : <button onClick={() => visibilitySetter(false)}>
            Close
          </button>
        }
      </ModalContainer>
    </Backdrop>
  );
};

export default Modal;