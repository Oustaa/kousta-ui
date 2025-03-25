import { PropsWithChildren, ReactNode } from "react";

/**
 * change unknown to be a generic type | unknown
 */

export type TableProps = {
  data: unknown[];
  loading: boolean;
  title: string;
  headers: TableHeaders;
  options?: {
    actions: TActions;
    extraActions: [];
    bulkActions: [];
    extraviews: TExtraViews[];
  };
};

export type TablePropsWithChildren =
  | (PropsWithChildren<TableProps> & { children: ReactNode })
  | (TableProps & { children?: never });

export type TableHeaders = Record<
  string,
  {
    value: string;
    exec?: (row: unknown) => string | ReactNode;
  }
>;

type TExtraViews = { name: string };

type TActions = {
  get: unknown;
  search: unknown;
  update: unknown;
  delete: unknown;
  // this action could be deleted
  restore: unknown;
};
