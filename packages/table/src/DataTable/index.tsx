import Table from "../Table";

import TableHead from "./components/TableHead";
import TableHeader from "./components/TableHeader";
import TableBody from "./components/TableBody";
import { useCallback, useState } from "react";
import { TableProps } from "./_props";
import { TableContextProvider } from "./tableContext";

function DataTable<T>(props: TableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Record<number, unknown>>({});

  const setSelectedRowsFunc = useCallback(
    (index: number, row: unknown, all: boolean = false) => {
      setSelectedRows((prev) => {
        if (index in selectedRows) {
          if (!all) {
            // eslint-disable-next-line
            const { [index]: _deleted, ...rest } = prev;
            return rest;
          }
          return prev;
        } else {
          return { ...prev, [index]: row };
        }
      });
    },
    [selectedRows],
  );

  return (
    <TableContextProvider
      {...props}
      rowSelection={{
        selectedRows,
        setSelectedRows: setSelectedRowsFunc,
      }}
    >
      <TableHead />
      <Table.Root>
        <TableHeader />
        <TableBody />
      </Table.Root>
    </TableContextProvider>
  );
}

export default DataTable;
