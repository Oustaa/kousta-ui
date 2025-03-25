import { FC, isValidElement } from "react";
import { TablePropsWithChildren } from "./@types/props";

// Table Header component
export const TableHeader = ({ headers }: { headers: string[] }) => {
  return (
    <thead className="kui-thead">
      <tr className="header kui-tr">
        {headers.map((header) => (
          <th className="kui-th" key={header}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

// Table Row component
export const TableRow = ({ rowData }: { rowData: string[] }) => {
  return (
    <tr className="kui-tr">
      {rowData.map((cellData, index) => (
        <TableCell key={index} value={cellData} />
      ))}
    </tr>
  );
};

// Table Cell component
const TableCell = ({ value }: { value: string }) => {
  return <td className="kui-td">{value}</td>;
};

// Main Table component
const Table: FC<TablePropsWithChildren> = (props) => {
  if (isValidElement(props.children)) {
    return <table className="kui-table">{props.children}</table>;
  }

  if (props.data.length === 0) return null;

  return (
    <table className="kui-table">
      {/* Render TableHeader with headers */}
      {/* <TableHeader headers={headers} /> */}
      <tbody>
        {/* {props.data.map((row, rowIndex) => (
          <TableRow key={rowIndex} rowData={Object.values(row) as string[]} />
        ))} */}
      </tbody>
    </table>
  );
};

export default Table;
