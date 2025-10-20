import { useState, type FunctionComponent, type ReactNode } from "react";
import './style.css';

interface CollapsibleProps {
  thumbnailSrc?: string,
  title?: string,
  children: ReactNode[] | ReactNode,
}

const Collapsible: FunctionComponent<CollapsibleProps> =
  ({ thumbnailSrc, title, children }) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
      <div>
        {thumbnailSrc != null
          && <img src={thumbnailSrc} className="img-thumbnail" alt="" />}
        <button
          className="info-collapse"
          onClick={() => setOpen(!open)}>
          {title}
        </button>
        {open
          &&
          <>
            {children}
          </>
        }
      </div>
    );
  };

export default Collapsible;