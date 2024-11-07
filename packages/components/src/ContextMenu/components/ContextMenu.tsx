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
        className="kui-contextMenu"
        ref={ref}
      >
        {options.map((option, index) => {
          return (
            <ContextMenuItem
              {...option}
              key={index}
              setMenuVisible={setMenuVisible}
            />
          );
        })}
      </div>
    );
  },
);