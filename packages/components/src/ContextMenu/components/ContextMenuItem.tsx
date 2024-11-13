import { FC } from "react";
import { ContextMenuItemProps } from "../_props";
import { ContextMenuItemWithSubs } from "./ContextMenuItemWithSubs";

export const ContextMenuItem: FC<
  ContextMenuItemProps & {
    offsetY: number;
    offsetX: number;
    itemCloseOnClick?: boolean;
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
    closeOnClick,
    itemCloseOnClick,
  } = props;
  if (hidden) return;

  if (subOptions)
    return (
      <ContextMenuItemWithSubs
        itemCloseOnClick={itemCloseOnClick}
        {...props}
        setMenuVisible={setMenuVisible}
      />
    );

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();

        if (
          itemCloseOnClick === true &&
          (closeOnClick === true || closeOnClick === undefined)
        ) {
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
