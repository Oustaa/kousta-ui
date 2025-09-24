import {
  CSSProperties,
  FC,
  PropsWithChildren,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { MenuContextProvider, useMenuContext } from "./MenuContextProvider";
import { MenuPosition, MenuProps } from "./_props";

import classes from "./Menu.module.css";

type postionStyleType = Record<MenuPosition, CSSProperties>;

function getPositionStyle(gapSize: number): postionStyleType {
  return {
    "Bottom-Center": {
      top: `calc(100% + ${gapSize}px)`,
      left: "50%",
      transform: "translateX(-50%)",
    },
    "Bottom-Start": {
      top: `calc(100% + ${gapSize}px)`,
      left: "0",
    },
    "Bottom-End": {
      top: `calc(100% + ${gapSize}px)`,
      right: "0",
    },
    "Left-Center": {
      right: `calc(100% + ${gapSize}px)`,
      top: "50%",
      transform: "translateY(-50%)",
    },
    "Left-Start": {
      right: `calc(100% + ${gapSize}px)`,
      top: "0",
    },
    "Left-End": {
      right: `calc(100% + ${gapSize}px)`,
      bottom: "0",
    },
    "Right-Center": {
      top: "50%",
      left: `calc(100% + ${gapSize}px)`,
      transform: "translateY(-50%)",
    },
    "Right-Start": {
      top: "0",
      left: `calc(100% + ${gapSize}px)`,
    },
    "Right-End": {
      left: `calc(100% + ${gapSize}px)`,
      bottom: "0",
    },
    "Top-Center": {
      bottom: `calc(100% + ${gapSize}px)`,
      left: "50%",
      transform: "translateX(-50%)",
    },
    "Top-Start": {
      bottom: `calc(100% + ${gapSize}px)`,
      left: "0",
    },
    "Top-End": {
      bottom: `calc(100% + ${gapSize}px)`,
      right: "0",
    },
  };
}

const MenuContainer: FC<PropsWithChildren<MenuProps>> = ({
  children,
  type = "click",
  closeItemOnClick = true,
  position = "Bottom-Start",
  offset = 4,
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
      position={position}
      offset={offset}
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
  const { opened, position, offset } = useMenuContext();
  if (!opened) return null;

  return (
    <div
      role="menu"
      style={getPositionStyle(offset!)[position!] as CSSProperties}
      className={classes["kui-menu_dropdown"]}
    >
      {children}
    </div>
  );
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
      role="menuitem"
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
