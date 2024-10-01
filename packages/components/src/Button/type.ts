export type ButtonProps = {
  loading?: boolean;
  disabled?: boolean;
  content: JSX.Element | string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
};
