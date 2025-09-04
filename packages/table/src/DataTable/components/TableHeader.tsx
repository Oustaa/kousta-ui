import Table from "../../Table";
import { useTableContext } from "../tableContext";

const TableHeader = () => {
  const tableProps = useTableContext();

  const { headers } = tableProps;

  return (
    <Table.Thead>
      <Table.Tr>
        {Object.keys(headers.data).map((header, index) => {
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
