import { FC, useEffect, useRef, useState } from "react";
import { ContextMenuItemWithSubsProps, ContextMenuOption } from "../_props";
import { renderIcon } from "../utils/renderIcon";

import ContextMenuItem from "./ContextMenuItem";
import Separator from "./ContextMenuSeparator";

const ContextMenuItemWithSubs: FC<
  ContextMenuItemWithSubsProps & {
    offsetY: number;
    offsetX: number;
    itemCloseOnClick?: boolean;
  }
> = ({
  icon,
  title,
  setMenuVisible,
  active = true,
  subOptions,
  offsetX,
  offsetY,
  itemCloseOnClick,
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
      <div className="kui-iconsContainer"></div>
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
        <div className="kui-contextMenu-ItemIcon">{renderIcon(icon)}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
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
            {subOptions?.map((option: ContextMenuOption, index: number) => {
              if (option.optionType === "Separator") return <Separator />;

              if (option.optionType === "Group") return "Group";

              if (
                option.optionType === "option" ||
                (option.optionType === undefined && option.subOptions)
              ) {
                return (
                  <ContextMenuItemWithSubs
                    key={index}
                    {...option}
                    setMenuVisible={setMenuVisible}
                    offsetX={offsetX}
                    offsetY={offsetY}
                    itemCloseOnClick={itemCloseOnClick}
                  />
                );
              }
              return (
                <ContextMenuItem
                  key={index}
                  {...option}
                  setMenuVisible={setMenuVisible}
                  offsetX={offsetX}
                  offsetY={offsetY}
                  itemCloseOnClick={itemCloseOnClick}
                />
              );
            })}
          </div>
        )}
      </button>
    </div>
  );
};

export default ContextMenuItemWithSubs;
