import { PropsWithChildren, ReactNode } from "react";

export type ContextMenuOptionType = {
  key: string;
  icon?: ReactNode;
  title: string;
  onClick: () => void;
  active?: boolean;
};

export interface ContextmenuProviderProps extends PropsWithChildren {
  options: ContextMenuOptionType[];
  As?: string;
  draggable?: boolean;
  onDragEnter?: () => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd?: () => void;
  onClick?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export interface ContextMenuItemProps extends ContextMenuOptionType {
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
