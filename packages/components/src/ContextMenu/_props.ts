import { PropsWithChildren, ReactNode } from "react";

export type ContextMenuTypeOption = {
  optionType?: "option";
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
      subOptions: (ContextMenuOption & { type?: "click" | "hover" })[];
      onClick?: never;
    }
);

export type ContextMenuTypeSeparato = {
  optionType: "Separator";
  icon?: never;
  title?: never;
  active?: never;
  hidden?: never;
  deactiveMessage?: never;
  closeOnClick?: never;
};

export type ContextMenuTypeGroup = {
  optionType: "Group";
  groupTitle: string;
  icon?: never;
  title?: never;
  active?: never;
  hidden?: never;
  deactiveMessage?: never;
  closeOnClick?: never;
};

export type ContextMenuOption =
  | ContextMenuTypeSeparato
  | ContextMenuTypeGroup
  | ContextMenuTypeOption;

export type ContextmenuProviderProps = {
  options: ContextMenuOption[];
  As?: string;
  onOpen?: () => void;
  onClose?: () => void;
  itemCloseOnClick?: boolean;
} & PropsWithChildren;

export type ContextMenuItemProps = ContextMenuOption & {
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ContextMenuItemWithSubsProps = ContextMenuTypeOption & {
  setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
