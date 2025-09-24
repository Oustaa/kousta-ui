import Table from "../../Table";
import { useTableContext } from "../tableContext";
import EmptyTable from "./EmptyTable";
import TableRow from "./TableRow";

const TableBody = () => {
  const { data } = useTableContext();

  return data.length === 0 ? (
    <EmptyTable />
  ) : (
    <Table.Tbody>
      {data.map((row, index) => {
        return <TableRow index={index} key={index} row={row} />;
      })}
    </Table.Tbody>
  );
};

export default TableBody;
