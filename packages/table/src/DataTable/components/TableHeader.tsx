import Table from "../../Table";
import { useTableContext } from "../tableContext";

const TableHeader = () => {
  const tableProps = useTableContext();

  const { headers } = tableProps;

  const headersLabel = Object.keys(headers.data).filter((header) => {
    console.log({ header, headerData: headers.data[header] });
    return (
      headers.data[header].visible !== false &&
      headers.data[header].canSee !== false
    );
  });

  return (
    <Table.Thead>
      <Table.Tr>
        {headersLabel.map((header, index) => {
          return (
            <Table.Th
              aria-checked="true"
              role="th"
              key={`${header} - ${index}`}
            >
              {header.toUpperCase()}
            </Table.Th>
          );
        })}
      </Table.Tr>
    </Table.Thead>
  );
};

export default TableHeader;
