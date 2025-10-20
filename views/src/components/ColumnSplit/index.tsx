import type { FunctionComponent, ReactNode } from "react";
import './style.css';

interface ColumnSplitProps {
  splitCount: number,
  children?: ReactNode[],
}

const ColumnSplit: FunctionComponent<ColumnSplitProps> = ({ splitCount, children }) => {
  let className: string;
  switch (splitCount) {
    case 2: className = "column2"; break;
    case 3: className = "column3"; break;
    case 4: className = "column4"; break;
    default: throw Error('column');
  }

  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default ColumnSplit;