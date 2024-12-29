import { PropsWithChildren, ReactNode } from "react";

export type ContextMenuOptionType = {
  type?: "separator";
  icon?: ReactNode;
  title?: string;
  active?: boolean;
  hidden?: boolean;
  deactiveMessage?: string;
  closeOnClick?: boolean;
} & (
  | {
      onClick: () => void;
      subOptions?: never;
    }
  | {
      subOptions: (ContextMenuOptionType & { type?: "click" | "hover" })[];
      onClick?: never;
    }
);

export type ContextmenuProviderProps = {
  options: ContextMenuOptionType[];
  As?: string;
  onOpen?: () => void;
  onClose?: () => void;
  itemCloseOnClick?: boolean;
} & PropsWithChildren;

export type ContextMenuItemProps = {
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
} & ContextMenuOptionType;
