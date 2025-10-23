import { MouseEvent, ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonColor = "primary" | "warning" | "neutral" | "danger" | "success";

type ButtonColoringStyle = "outline" | "light" | "link" | "";

export type ButtonVariant =
  | ButtonColor
  | `${ButtonColor}-${Exclude<ButtonColoringStyle, "">}`;

export type ButtonProps = {
  loading?: boolean;
  loadingIndicator?: string | ReactNode;
  disabled?: boolean;
  variant?: ButtonVariant | string;
  size?: "sm" | "md" | "lg";
  type?: "submit" | "reset" | "button";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
} & ComponentPropsWithoutRef<"button">;
