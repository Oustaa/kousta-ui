import { FC } from "react";
import Separator from "./ContextMenuSeparator";

const ContextmenuGroup: FC<{ title: string }> = ({ title }) => {
  return (
    <>
      <Separator />
      <div className="kui-contextMenu_separator_container">
        <div className="kui-contextMenu_separator_icon"></div>
        <span className="kui-contextMenu_group_title">{title}</span>
      </div>
    </>
  );
};

export default ContextmenuGroup;
