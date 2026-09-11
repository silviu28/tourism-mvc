import { useState, type FC } from "react";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255);
  font-family: monospace;

  thead {
    background: orange;
    color: black;
  }
`;

interface DynamicTableProps {
  items: Record<string, unknown>[];
  onRowSelect: (item: object) => void
}

const DynamicTable: FC<DynamicTableProps> = ({ items, onRowSelect })  => {
  const [selected, setSelected] = useState<object | null>(null);

  if (!items || items.length === 0) {
    return <p>No data to display.</p>;
  }

  const headers = Object.keys(items[0]);

  return (
    <Table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header.toUpperCase()}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((item, rowIndex) => (
          <tr
            key={rowIndex}
            onClick={() => {
              setSelected(item);
              onRowSelect(item); 
            }}
            style={item === selected ? { backgroundColor: "#ffce8f" } : {}}
          >
              {headers.map((header) => (
                <td key={header}>{String(item[header])}</td>
              ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DynamicTable;