import Table from "../../Table";
import { useTableContext } from "../tableContext";
import { hasActions } from "../utils/tableAction";

const TableHeader = () => {
  const tableProps = useTableContext();

  const { headers, options } = tableProps;

  const headersLabel = Object.keys(headers.data).filter((header) => {
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
        {hasActions(options) && <Table.Th>ACTIONS</Table.Th>}
      </Table.Tr>
    </Table.Thead>
  );
};

export default TableHeader;
