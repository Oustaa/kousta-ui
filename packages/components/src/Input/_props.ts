import { ComponentPropsWithoutRef, ReactNode } from "react";

export type InputProps = ComponentPropsWithoutRef<"input"> & {
  label?: string;
  labelProps?: ComponentPropsWithoutRef<"label">;
  errors?: string[] | string | ReactNode;
  required?: boolean;
  onMaxExited?: VoidFunction;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
};
