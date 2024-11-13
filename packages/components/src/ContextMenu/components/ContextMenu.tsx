import { forwardRef } from "react";
import { ContextMenuOptionType } from "../_props";
import { ContextMenuItem } from "./ContextMenuItem";

interface ContextMenuMenuProps {
  x: number;
  y: number;
  offsetY: number;
  offsetX: number;
  options: ContextMenuOptionType[];
  itemCloseOnClick: boolean;
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContextMenuMenu = forwardRef<HTMLDivElement, ContextMenuMenuProps>(
  (
    { x, y, options, setMenuVisible, offsetX, offsetY, itemCloseOnClick },
    ref,
  ) => {
    return (
      <div
        style={{
          top: `${y - offsetY}px`,
          left: `${x - offsetX}px`,
        }}
        className="kui-contextMenu"
        ref={ref}
      >
        {options.map((option, index) => {
          return (
            <ContextMenuItem
              {...option}
              key={index}
              setMenuVisible={setMenuVisible}
              offsetX={offsetX}
              offsetY={offsetY}
              itemCloseOnClick={itemCloseOnClick}
            />
          );
        })}
      </div>
    );
  },
);
