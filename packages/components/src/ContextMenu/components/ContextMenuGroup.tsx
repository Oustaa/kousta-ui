import { FC } from "react";
import Separator from "./ContextMenuSeparator";

import classes from "../ContextMenu.module.css";

const ContextmenuGroup: FC<{ title: string }> = ({ title }) => {
  return (
    <>
      <Separator />
      <div className={classes["kui-contextMenu_separator_container"]}>
        <div className={classes["kui-contextMenu_separator_icon"]}></div>
        <span className={classes["kui-contextMenu_group_title"]}>{title}</span>
      </div>
    </>
  );
};

export default ContextmenuGroup;
