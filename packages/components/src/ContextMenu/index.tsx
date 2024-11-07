import {
  FC,
  useEffect,
  useRef,
  useState,
  MouseEvent as ReactMouseEvent,
} from "react";
import { ContextmenuProviderProps } from "./_props";
import { ContextMenuMenu } from "./components/ContextMenu";

const ContextmenuProvider: FC<ContextmenuProviderProps> = ({
  children,
  onClose,
  onOpen,
  options,
  As = "div",
  ...extraProps
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [coordinates, setCoordinates] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose?.();
        setMenuVisible(false);
      }
    };

    if (menuVisible) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [menuVisible, onClose]);

  const handleContextMenu = (e: ReactMouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setCoordinates({ x: e.pageX, y: e.pageY });
    setMenuVisible(true);
    onOpen?.();
  };

  return (
    // @ts-expect-error this is not an error
    <As {...extraProps} onContextMenu={handleContextMenu}>
      {children}
      <div className="kui-contextMenu-Container">
        {menuVisible && options.length > 0 && (
          <ContextMenuMenu
            ref={menuRef}
            x={coordinates.x}
            y={coordinates.y}
            options={options}
            setMenuVisible={setMenuVisible}
          />
        )}
      </div>
    </As>
  );
};

export default ContextmenuProvider;
