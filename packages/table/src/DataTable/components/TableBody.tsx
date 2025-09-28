import Table from "../../Table";
import { useTableContext } from "../tableContext";
import EmptyTable from "./EmptyTable";
import TableRow from "./TableRow";

const TableBody = <T extends Record<string, unknown>>() => {
  const { data } = useTableContext();

  return data.length === 0 ? (
    <EmptyTable />
  ) : (
    <Table.Tbody>
      {data.map((row, index) => {
        return (
          <TableRow<T>
            index={index}
            key={index}
            // @ts-expect-error this is not an error
            row={row}
          />
        );
      })}
    </Table.Tbody>
  );
};

export default TableBody;
