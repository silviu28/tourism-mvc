import type { FC, ReactNode } from "react"
import "./style.css";

interface ModalProps {
  isVisible: boolean;
  children?: ReactNode;
};

const Modal: FC<ModalProps> = ({ isVisible, children }) => {
  if (!isVisible) return;

  return (
    <div className="modal">
      {children}
    </div>
  );
};

export default Modal;