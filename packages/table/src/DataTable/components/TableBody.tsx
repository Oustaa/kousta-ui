import Table from "../../Table";
import { useTableContext } from "../tableContext";
import TableRow from "./TableRow";

const TableBody = () => {
  const { data } = useTableContext();

  return (
    <Table.Tbody>
      {data.map((row, index) => {
        return <TableRow key={index} row={row} />;
      })}
    </Table.Tbody>
  );
};

export default TableBody;
