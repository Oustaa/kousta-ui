import { cloneElement, ReactNode } from "react";

export function renderIcon(icon?: ReactNode, fontSize: string = "18px") {
  return (
    icon &&
    typeof icon !== "string" &&
    typeof icon !== "number" &&
    icon !== true &&
    cloneElement(icon as React.ReactElement, {
      style: {
        fontSize,
      },
    })
  );
}
