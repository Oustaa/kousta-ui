import React from "react";
import { ButtonProps } from "./type";

import classes from "./Button.module.css";

const Button: React.FC<ButtonProps> = ({
  content,
  disabled,
  loading,
  onClick,
  type = "button",
}) => {
  return (
    <button
      className={classes["btn-primary"]}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {loading ? <div className="">Loading...</div> : content}
    </button>
  );
};

export default Button;
