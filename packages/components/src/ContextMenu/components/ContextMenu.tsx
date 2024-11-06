import { forwardRef } from "react";
import { ContextMenuOptionType } from "../_props";
import { ContextMenuItem } from "./ContextMenuItem";

interface ContextMenuMenuProps {
  x: number;
  y: number;
  options: ContextMenuOptionType[];
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContextMenuMenu = forwardRef<HTMLDivElement, ContextMenuMenuProps>(
  ({ x, y, options, setMenuVisible }, ref) => {
    return (
      <div
        style={{ top: `${y}px`, left: `${x}px` }}
        // className="p-2 shadow bg-white absolute rounded z-50"
        className="kui-contextMenu-Menu"
        ref={ref}
      >
        {options.map((option, index) => (
          <ContextMenuItem
            {...option}
            key={index + option?.key}
            setMenuVisible={setMenuVisible}
          />
        ))}
      </div>
    );
  },
);
