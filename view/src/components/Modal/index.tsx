import type { Dispatch, FC, ReactNode } from "react"
import "./style.css";

interface ModalProps {
  isVisible: boolean;
  visibilitySetter: Dispatch<boolean>;
  children?: ReactNode;
};

const Modal: FC<ModalProps> = ({ isVisible, visibilitySetter, children }) => {
  if (!isVisible) return;

  return (
    <div className="modal">
      {children}
      <button onClick={() => visibilitySetter(false)}>
        Close
      </button>
    </div>
  );
};

export default Modal;