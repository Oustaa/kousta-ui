import { FC } from "react";
import { ContextMenuItemProps } from "../_props";

export const ContextMenuItem: FC<ContextMenuItemProps> = ({
  icon,
  onClick,
  title,
  setMenuVisible,
  active = true,
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
        setMenuVisible(false);
      }}
      // className="flex gap-2 items-center text-sm disabled:opacity-25 disabled:hover:cursor-not-allowed"
      className="kui-contextMenu-MenuItem"
      disabled={!active}
    >
      {icon && icon} {title}
    </button>
  );
};
