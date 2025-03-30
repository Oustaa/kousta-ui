import Table from "../../Table";
import { useTableContext } from "../tableContext";

const TableHead = () => {
  const tableProps = useTableContext();

  const { headers } = tableProps;

  return (
    <Table.Thead>
      <Table.Tr>
        {Object.keys(headers.data).map((header, index) => {
          return (
            <Table.Th key={`${header} - ${index}`}>
              {header.toUpperCase()}
            </Table.Th>
          );
        })}
      </Table.Tr>
    </Table.Thead>
  );
};

export default TableHead;
