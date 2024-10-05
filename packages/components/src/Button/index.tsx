import React from "react";
import { ButtonProps } from "./type";

import "@kousta-ui/styles/index.scss";

const Button: React.FC<ButtonProps> = ({
  content,
  disabled,
  loading,
  onClick,
  type = "button",
}) => {
  return (
    <button
      className="btn-primary"
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">Loading...</div>
      ) : (
        content
      )}
    </button>
  );
};

export default Button;
