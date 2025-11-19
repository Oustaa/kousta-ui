import { CSSProperties, FC } from "react";
import { InputProps } from "./_props";
import {
  renderLeftSectionItem,
  renderMiddleSectionItem,
  renderRightSectionItem,
} from "../utils/renderSections";

import classes from "./Input.module.css";
import Label from "../Label";
import { LabelPositionBase } from "../_core/types";

function flexDirection(position: LabelPositionBase): CSSProperties {
  switch (position) {
    case "x":
      return {
        flexDirection: "row",
        alignItems: "center",
      };
    case "y":
      return {
        flexDirection: "column",
        alignItems: "start",
      };
  }
}

const Input: FC<InputProps> = ({
  label,
  errors,
  required,
  leftSection,
  rightSection,
  labelProps,
  labelPosition = "y",
  ...rest
}) => {
  return (
    <div className={classes["formElement"]}>
      <div
        className={classes["input-label-container"]}
        style={flexDirection(labelPosition)}
      >
        {label && (
          <Label
            label={label}
            {...labelProps}
            required={required}
            errors={errors}
          />
        )}
        <div className={classes["input-container"]}>
          {leftSection && renderLeftSectionItem(leftSection)}
          {renderMiddleSectionItem(
            <input
              data-error={
                // this is not correct based on the type of the errors...
                Array.isArray(errors) && errors.length > 0 ? "true" : "false"
              }
              className={classes["input"]}
              id={label}
              {...rest}
            />,
            {
              left: leftSection,
              right: rightSection,
            },
          )}
          {rightSection && renderRightSectionItem(rightSection)}
        </div>
      </div>

      <span className={classes["error-message"]}>
        {(errors as string[])?.[0]}
      </span>
    </div>
  );
};

export default Input;
