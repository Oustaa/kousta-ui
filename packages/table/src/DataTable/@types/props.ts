import { PropsWithChildren, ReactNode } from "react";

/**
 * change unknown to be a generic type | unknown
 */

export type TableProps = {
  // eslint-disable-next-line
  data: any[];
  loading: boolean;
  title: string;
  headers: TableHeaders;
  options?: {
    actions: TActions;
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
  exec?: (row: unknown) => string | ReactNode;
};

export type THeader = Record<string, THeaderValue>;

export type TableHeaders = {
  data: THeader;
  setHeaders: React.Dispatch<React.SetStateAction<THeader>>;
};

type TExtraView = { name: string };

type TActions = {
  get: unknown;
  search: unknown;
  update: unknown;
  delete: unknown;
  // this action could be deleted
  restore: unknown;
};
