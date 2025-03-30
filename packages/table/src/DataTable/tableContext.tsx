import { createContext, FC, PropsWithChildren, useContext } from "react";
import { TableProps } from "./@types/props";

type TTableContextType = TableProps;

const tableContext = createContext<TTableContextType | null>(null);

export const useTableContext = () => {
  const context = useContext(tableContext) as TTableContextType;

  return context;
};

export const TableContextProvider: FC<PropsWithChildren<TTableContextType>> = ({
  children,
  ...rest
}) => {
  return <tableContext.Provider value={rest}>{children}</tableContext.Provider>;
};
