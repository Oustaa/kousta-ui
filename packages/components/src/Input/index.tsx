import { FC } from "react";
import { InputProps } from "./types";

import classes from "./Input.module.css";

const Input: FC<InputProps> = ({
  label,
  errors,
  required,
  leftSection,
  rightSection,
  labelProps,
  ...rest
}) => {
  return (
    <div className={classes["formElement"]}>
      {label && (
        <label
          data-required={label && String(required)}
          data-error={
            // this is not correct based on the type of the errors...
            Array.isArray(errors) && errors.length > 0 ? "true" : "false"
          }
          className={classes["label"]}
          htmlFor={label}
          {...labelProps}
        >
          {label}
        </label>
      )}
      <div className={classes["input-container"]}>
        {leftSection && leftSection}
        <input
          data-error={
            // this is not correct based on the type of the errors...
            Array.isArray(errors) && errors.length > 0 ? "true" : "false"
          }
          className={classes["input"]}
          id={label}
          {...rest}
        />
        {rightSection && rightSection}
      </div>
      <span className={classes["error-message"]}>
        {(errors as string[])?.[0]}
      </span>
    </div>
  );
};

export default Input;
