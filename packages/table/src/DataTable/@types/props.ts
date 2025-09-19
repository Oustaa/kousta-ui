/* eslint-disable @typescript-eslint/no-explicit-any */
import { PropsWithChildren, ReactNode } from "react";

/**
 * change unknown to be a generic type | unknown
 */

export type TableProps = {
  data: any[];
  loading: boolean;
  title: string;
  headers: TableHeaders;
  options?: {
    search?: TSearch;
    actions: Partial<TActions>;
    extraActions: [];
    bulkActions: [];
    extraviews: TExtraView[];
  };
};

export type TablePropsWithChildren =
  | (PropsWithChildren<TableProps> & { children: ReactNode })
  | (TableProps & { children?: never });

export type THeaderValue = {
  value: string;
  exec?: (row: any) => string | ReactNode;
  visible?: boolean;
  canSee?: boolean;
};

export type THeader = Record<string, THeaderValue>;

export type TableHeaders = {
  data: THeader;
  setHeaders: React.Dispatch<React.SetStateAction<THeader>>;
};

type TExtraView = { name: string };

type TSearch = (
  q: string,
  extrasProps?: Record<string, string | number | Array<string> | Array<number>>,
) => void;

type TActions = {
  get: () => void;
  search: () => void;
  update: (row: any) => void;
  delete: (row: any) => void;
  // this action could be deleted
  restore: unknown;
};
