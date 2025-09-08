import { createContext, FC, PropsWithChildren, useContext } from "react";
import { MenuProps } from "./_props";

type MenuContextType = {
  opened: boolean;
  open: VoidFunction;
  close: VoidFunction;
  toggle: VoidFunction;
} & MenuProps;

const menuContext = createContext<MenuContextType | null>(null);

export const useMenuContext = () => {
  const context = useContext(menuContext) as MenuContextType;

  return context;
};

export const MenuContextProvider: FC<PropsWithChildren<MenuContextType>> = ({
  children,
  ...rest
}) => {
  return <menuContext.Provider value={rest}>{children}</menuContext.Provider>;
};
