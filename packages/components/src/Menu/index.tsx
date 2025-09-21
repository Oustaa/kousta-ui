import {
  FC,
  PropsWithChildren,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { MenuContextProvider, useMenuContext } from "./MenuContextProvider";
import { MenuProps } from "./_props";

import classes from "./Menu.module.css";

const MenuContainer: FC<PropsWithChildren<MenuProps>> = ({
  children,
  type = "click",
  closeItemOnClick = true,
  ...props
}) => {
  const menuRef = useRef<null | HTMLDivElement>(null);
  const [opened, setOpened] = useState(false);

  useLayoutEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <div
        ref={menuRef}
        onMouseEnter={() => {
          if (type === "click") return;

          setOpened(true);
        }}
        onMouseLeave={() => {
          if (type === "click") return;

          setOpened(false);
        }}
        className={classes["kui-menu"]}
      >
        {children}
      </div>
    </MenuContextProvider>
  );
};

const MenuTarget: FC<PropsWithChildren> = ({ children }) => {
  const { toggle, type } = useMenuContext();

  return (
    <button
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

const MenuItem: FC<
  PropsWithChildren<{
    closeOnClick?: boolean;
    leftSection?: ReactNode;
    rightSection?: ReactNode;
  }>
> = ({ children, closeOnClick, leftSection, rightSection }) => {
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
      {leftSection && leftSection}
      {children}
      {rightSection && rightSection}
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
