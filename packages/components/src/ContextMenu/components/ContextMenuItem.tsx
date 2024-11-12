import { FC } from "react";
import { ContextMenuItemProps } from "../_props";
import { ContextMenuItemWithSubs } from "./ContextMenuItemWithSubs";

export const ContextMenuItem: FC<
  ContextMenuItemProps & {
    offsetY: number;
    offsetX: number;
  }
> = (props) => {
  const {
    icon,
    onClick,
    title,
    setMenuVisible,
    active = true,
    hidden,
    subOptions,
    closeOnClick = true,
  } = props;
  if (hidden) return;

  if (subOptions)
    return (
      <ContextMenuItemWithSubs {...props} setMenuVisible={setMenuVisible} />
    );

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
        if (closeOnClick) {
          setMenuVisible(false);
        }
      }}
      className="kui-contextMenu-Item"
      disabled={!active}
    >
      <div className="kui-contextMenu-Item_Icon">{icon && icon}</div>
      {title}
    </button>
  );
};
