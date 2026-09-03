import { useState, type FC } from "react";

interface DynamicTableProps {
  items: Record<string, unknown>[];
  onRowSelect: (item: object) => void
}

const DynamicTable: FC<DynamicTableProps> = ({ items, onRowSelect })  => {
  const headers = Object.keys(items[0]);
  const [selected, setSelected] = useState<object | null>(null);

  if (!items || items.length === 0) {
    return <p>No data to display.</p>;
  }

  return (
    <table className="pricetable">
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
    </table>
  );
};

export default DynamicTable;