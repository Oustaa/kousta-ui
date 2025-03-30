import { FC } from "react";
import Table from "../../Table";
import { useTableContext } from "../tableContext";
import TableRowCol from "./TableRowCol";

const TableRow: FC<{ row: Record<string, unknown> }> = ({ row }) => {
  const { headers } = useTableContext();

  return (
    <Table.Tr>
      {Object.values(headers.data).map((headerValue) => {
        return (
          <TableRowCol
            key={`${headerValue.value} - table row`}
            headerValue={headerValue}
            row={row}
          />
        );
      })}
    </Table.Tr>
  );
};

export default TableRow;
