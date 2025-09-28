import { createContext, PropsWithChildren, useContext } from "react";
import type { TableProps } from "./@types/props";

type TableContextType<T> = TableProps<T>;

const TableContext = createContext<TableContextType<unknown> | null>(null);

export function useTableContext<T>() {
  const ctx = useContext(TableContext);
  if (!ctx) {
    throw new Error(
      "useTableContext must be used within a TableContextProvider",
    );
  }
  return ctx as TableContextType<T>;
}

export const TableContextProvider = <T,>({
  children,
  ...value
}: PropsWithChildren<TableContextType<T>>) => {
  return (
    <TableContext.Provider value={value as TableContextType<unknown>}>
      {children}
    </TableContext.Provider>
  );
};
