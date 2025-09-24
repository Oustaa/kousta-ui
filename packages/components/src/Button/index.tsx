import React, { PropsWithChildren } from "react";
import { ButtonProps, ButtonVarient } from "./type";

import classes from "./Button.module.css";

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  children,
  disabled,
  loading,
  onClick,
  type = "button",
  varient = "primary",
}) => {
  const buttonVarientsClassName: Record<ButtonVarient, string> = {
    primary: classes["btn-primary"],
    secondary: classes["btn-secondary"],
  };

  return (
    <button
      role="button"
      className={
        buttonVarientsClassName[varient as keyof typeof buttonVarientsClassName]
      }
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {loading ? <div className="">Loading...</div> : children}
    </button>
  );
};

export default Button;
