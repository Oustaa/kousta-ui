import { FC } from "react";
import { ContextMenuItemProps } from "../_props";
import { renderIcon } from "../utils/renderIcon";
import ContextMenuSeparator from "./ContextMenuSeparator";
import ContextMenuGroup from "./ContextMenuGroup";

import classes from "../ContextMenu.module.css";

const ContextMenuItem: FC<
  ContextMenuItemProps & {
    offsetY: number;
    offsetX: number;
    itemCloseOnClick?: boolean;
  }
> = (props) => {
  const {
    icon,
    // @ts-expect-error sdfwe fd
    onClick,
    title,
    setMenuVisible,
    active = true,
    hidden,
    closeOnClick = true,
    itemCloseOnClick = true,
  } = props;

  if (hidden) return;

  if (props.optionType && props.optionType === "Separator")
    return <ContextMenuSeparator />;

  if (props.optionType && props.optionType === "Group")
    return <ContextMenuGroup title={props.groupTitle} />;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();

        onClick?.();

        if (
          (itemCloseOnClick !== false && closeOnClick === true) ||
          closeOnClick === true
        ) {
          setMenuVisible(false);
        }
      }}
      className={classes["kui-contextMenu-Item"]}
      disabled={!active}
    >
      <div className={classes["kui-contextMenu-ItemIcon"]}>
        {renderIcon(icon)}
      </div>
      {title}
    </button>
  );
};

export default ContextMenuItem;
