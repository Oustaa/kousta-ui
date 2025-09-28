/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithChildren, ReactNode } from "react";

/**
 * change unknown to be a generic type | unknown
 */
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
  bulkActions: [];
  extraviews: TExtraView[];
  emptyTable: ReactNode;
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
