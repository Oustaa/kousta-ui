import { FC, useEffect, useRef, useState } from "react";
import { ContextMenuItemProps } from "../_props";
import { ContextMenuItem } from "./ContextMenuItem";

export const ContextMenuItemWithSubs: FC<
  ContextMenuItemProps & {
    offsetY: number;
    offsetX: number;
  }
> = ({
  icon,
  title,
  setMenuVisible,
  active = true,
  subOptions,
  offsetX,
  offsetY,
}) => {
  const menuSubRef = useRef<HTMLButtonElement | null>(null);
  const [subsOpened, setSubsOpened] = useState<boolean>(false);

  useEffect(() => {
    const closeSubs = (e: MouseEvent) => {
      if (
        menuSubRef.current &&
        !menuSubRef.current.contains(e.target as Node)
      ) {
        setSubsOpened(false);
      }
    };

    window.addEventListener("mousedown", closeSubs);
    return () => window.removeEventListener("mousedown", closeSubs);
  }, []);

  return (
    <div>
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
          <div
            className="kui-contextMenu kui-contextMenu-Item_WithSubs"
            style={{
              left: !offsetX ? "100%" : "unset",
              right: offsetX ? "100%" : "unset",
              top: !offsetY ? 0 : "unset",
              bottom: offsetY ? 0 : "unset",
              transform: `translateX(${4 * (offsetX ? -1 : 1)}px)`,
            }}
          >
            {subOptions?.map((option, index) => {
              return (
                <ContextMenuItem
                  key={index}
                  {...option}
                  setMenuVisible={setMenuVisible}
                  offsetX={offsetX}
                  offsetY={offsetY}
                />
              );
            })}
          </div>
        )}
      </button>
    </div>
  );
};
