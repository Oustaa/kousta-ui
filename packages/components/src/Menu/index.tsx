import { FC, PropsWithChildren, ReactNode, useState } from "react";
import { MenuContextProvider, useMenuContext } from "./MenuContextProvider";
import { MenuProps } from "./_props";

import classes from "./Menu.module.css";

const MenuContainer: FC<PropsWithChildren<MenuProps>> = ({
  children,
  type = "click",
  closeItemOnClick = true,
  ...props
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <MenuContextProvider
      opened={opened}
      open={() => setOpened(true)}
      close={() => setOpened(false)}
      toggle={() => setOpened((prev) => !prev)}
      type={type}
      closeItemOnClick={closeItemOnClick}
      {...props}
    >
      <div className={classes["kui-menu"]}>{children}</div>
    </MenuContextProvider>
  );
};

const MenuTarget: FC<PropsWithChildren> = ({ children }) => {
  const { toggle, close, open, type } = useMenuContext();

  return (
    <button
      onMouseEnter={() => {
        if (type === "click") return;

        open();
      }}
      onMouseLeave={() => {
        if (type === "click") return;

        close();
      }}
      onClick={() => {
        if (type === "hover") return;

        toggle();
      }}
      className={classes["kui-menu_target"]}
    >
      {children}
    </button>
  );
};

const MenuDropDown: FC<PropsWithChildren> = ({ children }) => {
  const { opened } = useMenuContext();

  if (!opened) return null;

  return <div className={classes["kui-menu_dropdown"]}>{children}</div>;
};

const MenuItem: FC<PropsWithChildren<{ closeOnClick?: boolean }>> = ({
  children,
  closeOnClick,
}) => {
  const { close, closeItemOnClick } = useMenuContext();

  return (
    <button
      onClick={() => {
        if (
          (closeOnClick === undefined && closeItemOnClick) ||
          closeOnClick === true
        )
          close();
      }}
      className={classes["kui-menu_item"]}
    >
      {children}
    </button>
  );
};

const MenuLabel: FC<
  PropsWithChildren<{ leftSection?: ReactNode; rightSection?: ReactNode }>
> = ({ children, leftSection, rightSection }) => {
  return (
    <span className={classes["kui-menu_label"]}>
      {leftSection && leftSection}
      {children}
      {rightSection && rightSection}
    </span>
  );
};

const MenuDivider = () => {
  return <hr className={classes["kui-menu_divider"]} />;
};

export default {
  Menu: MenuContainer,
  Target: MenuTarget,
  DropDown: MenuDropDown,
  Item: MenuItem,
  Label: MenuLabel,
  Divider: MenuDivider,
};
