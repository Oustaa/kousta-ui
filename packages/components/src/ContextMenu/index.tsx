import React, { FC, useEffect, useRef, useState } from "react";
import { ContextmenuProviderProps } from "./_props";
import { ContextMenuMenu } from "./components/ContextMenu";

const ContextmenuProvider: FC<ContextmenuProviderProps> = ({
  children,
  onClose,
  onOpen,
  options,
  As = "dev",
  ...extarProps
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [cordinations, setCordinations] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const menuRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (menuVisible) {
      const handleClickOutside = (e: MouseEvent) => {
        // @ts-expect-error dfdf
        if (!menuRef?.current?.contains(e.target)) {
          onClose?.();
          setMenuVisible(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [menuVisible]);

  return (
    // @ts-expect-error dfdf
    <As
      as
      HtmlElement
      {...extarProps}
      onContextMenu={(e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCordinations({ x: e.pageX, y: e.pageY });
        setMenuVisible(true);
        onOpen?.();
      }}
    >
      {children}
      <div className="kui-contextMenu-Container" style={{ background: "red" }}>
        {menuVisible && options.length ? (
          <ContextMenuMenu
            ref={menuRef}
            {...cordinations}
            options={options}
            setMenuVisible={setMenuVisible}
          />
        ) : null}
      </div>
    </As>
  );
};

export default ContextmenuProvider;
