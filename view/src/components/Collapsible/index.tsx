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
      <div className="composite-collapse">
        {thumbnailSrc != null
          && <img src={thumbnailSrc} className="img-thumbnail" alt="" />}
        <div
          className="info-collapse"
          onClick={() => setOpen(!open)}>
          {title}
        </div>
        {open
          &&
          <div className="info-collapse-content">
            {children}
          </div>
        }
      </div>
    );
  };

export default Collapsible;