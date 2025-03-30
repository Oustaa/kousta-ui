import { FC } from "react";
import { TableContextProvider } from "./tableContext";
import { TableProps } from "./@types/props";
import Table from "../Table";

import TableBody from "./components/TableBody";
import TableHead from "./components/TableHead";

const DataTable: FC<TableProps> = (props) => {
  return (
    <TableContextProvider {...props}>
      <Table.Root>
        <TableHead />
        <TableBody />
      </Table.Root>
    </TableContextProvider>
  );
};

export default DataTable;
