import { MouseEvent } from "react";

export type ButtonVarient = "primary" | "secondary";

export type ButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  varient?: ButtonVarient;
  type?: "submit" | "reset" | "button";
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
};
