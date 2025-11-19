import { PropsWithChildren } from "react";

export type GroupProps = PropsWithChildren<{
  direction?: "row" | "column";
  gap?: string;
}>;
