/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithChildren, ReactNode } from "react";
import { ModalProps } from "@kousta-ui/components";

export type TableProps<T> = {
  data: T[];
  loading: boolean;
  title: string;
  headers: TableHeaders<T>;
  options?: TOptions<T>;
};

export type TOptions<T> = Partial<{
  search: TSearch;
  actions: Partial<TActions<T>>;
  extraActions: Array<ExtraActions<T>>;
  emptyTable: ReactNode;
  viewComp: {
    Component: (row: T) => ReactNode;
    type?: "Modal" | "Row";
    modalOptions?: Omit<ModalProps, "opned" | "onClose" | "modalTrigger">;
  } & (
    | {
        type: "Modal";
        modalOptions?: ModalProps;
      }
    | {
        type?: "Row";
        modalOptions?: never;
      }
  );
  bulkActions: TBulkActions<T>[];
  extraviews: TExtraView[];
  selectFilter: Record<string, (row: T) => boolean>;
}>;

export type TablePropsWithChildren<T> =
  | (PropsWithChildren<TableProps<T>> & { children: ReactNode })
  | (TableProps<T> & { children?: never });

export type THeaderValue<T> = {
  value: string;
  exec?: (row: T) => string | ReactNode;
  visible?: boolean;
  canSee?: boolean;
};

export type THeader<T> = Record<string, THeaderValue<T>>;

export type TableHeaders<T> = {
  data: THeader<T>;
  setHeaders: React.Dispatch<React.SetStateAction<THeader<T>>>;
};

type TBulkActions<T> = {
  title: string;
  onClick: (rows: T[]) => void | Promise<unknown>;
  valueExtractor?: (rows: T[]) => unknown;
};

type TExtraView = { name: string };

type TSearch = (
  q: string,
  options: {
    visibleHeaders: string[];
    props: Record<string, string | number | Array<string> | Array<number>>;
  },
) => void;

type TActions<T> = {
  get: () => void;
  edit: {
    canEdit?: CanPerformAction<T>;
    onEdit: (row: any) => void;
  };
  delete: {
    canDelete?: CanPerformAction<T>;
    onDelete: (row: any) => void;
  };
  // this action could be deleted
  restore: unknown;
};

type ExtraActions<T> = {
  title: string | ReactNode;
  onClick: (row: T) => void;
  Icon?: ReactNode;
  allowed?: CanPerformAction<T>;
};

export type CanPerformAction<T> = ((row: T) => boolean) | boolean;
