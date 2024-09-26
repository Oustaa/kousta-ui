import React from "react";
import { ButtonProps } from "./type";

const Button: React.FC<ButtonProps> = ({ label }) => {
  return <button>{label}</button>;
};

export default Button;
