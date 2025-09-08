import { FC, PropsWithChildren, ReactNode, useState } from "react";
import { MenuContextProvider, useMenuContext } from "./MenuContextProvider";
import { MenuProps } from "./_props";

const MenuContainer: FC<PropsWithChildren<MenuProps>> = ({
  children,
  ...props
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <MenuContextProvider
      opened={opened}
      open={() => setOpened(true)}
      close={() => setOpened(false)}
      toggle={() => setOpened((prev) => !prev)}
      {...props}
    >
      <div className="kui-menu">{children}</div>
    </MenuContextProvider>
  );
};

const MenuTarget: FC<PropsWithChildren> = ({ children }) => {
  // might use use ref
  const { toggle, type } = useMenuContext();

  return (
    <button
      onClick={() => {
        if (type === "hover") return;

        toggle();
      }}
      className="kui-menu-target"
    >
      {children}
    </button>
  );
};

const MenuDropDown: FC<PropsWithChildren> = ({ children }) => {
  const { opened } = useMenuContext();

  if (!opened) return null;

  return <div className="kui-menu-dropdown">{children}</div>;
};

const MenuItem: FC<PropsWithChildren> = ({ children }) => {
  return <div className="kui-menu-item">{children}</div>;
};

const MenuLabel: FC<
  PropsWithChildren<{ leftSection?: ReactNode; rightSection?: ReactNode }>
> = ({ children, leftSection, rightSection }) => {
  return (
    <span className="kui-menu-label">
      {leftSection && leftSection}
      {children}
      {rightSection && rightSection}
    </span>
  );
};

const MenuDivider = () => {
  return <hr className="kui-menu-divider" />;
};

export default {
  Menu: MenuContainer,
  Target: MenuTarget,
  DropDown: MenuDropDown,
  Item: MenuItem,
  Label: MenuLabel,
  Divider: MenuDivider,
};
