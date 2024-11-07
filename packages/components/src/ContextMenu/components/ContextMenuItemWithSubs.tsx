import { FC, useRef, useState } from "react";
import { ContextMenuItemProps } from "../_props";
import { ContextMenuItem } from "./ContextMenuItem";

export const ContextMenuItemWithSubs: FC<ContextMenuItemProps> = ({
  icon,
  title,
  setMenuVisible,
  active = true,
  subOptions,
}) => {
  const menuSubRef = useRef<null | HTMLButtonElement>(null);
  const [subsOpened, setSubsOpened] = useState<boolean>(false);

  return (
    <button
      ref={menuSubRef}
      onClick={(e) => {
        e.stopPropagation();
        if (!active) {
          return;
        }
        setSubsOpened(true);
      }}
      className="kui-contextMenu-Item"
      disabled={!active}
    >
      <div className="kui-contextMenu-ItemIcon">{icon && icon}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "8px",
          width: "100%",
        }}
      >
        {title}
        <span>&gt;</span>
      </div>
      {subsOpened && (
        <div className="kui-contextMenu kui-contextMenu-Item_WithSubs">
          {subOptions?.map((option, index) => {
            return (
              <ContextMenuItem
                key={index}
                {...option}
                setMenuVisible={setMenuVisible}
              />
            );
          })}
        </div>
      )}
    </button>
  );
};
