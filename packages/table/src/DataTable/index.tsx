import { TableContextProvider } from "./tableContext";
import { TableProps } from "./@types/props";
import Table from "../Table";

import TableHead from "./components/TableHead";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";

function DataTable<T>(props: TableProps<T>) {
  return (
    <TableContextProvider {...props}>
      <TableHead />
      <Table.Root>
        <TableHeader />
        <TableBody />
      </Table.Root>
    </TableContextProvider>
  );
}

export default DataTable;
