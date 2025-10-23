import { CSSProperties } from "react";
import { ModalPosition } from "./_props";

export const modalPositionStyle = (
  offset?: number,
): Record<ModalPosition, CSSProperties> => ({
  center: {
    marginInline: "auto",
    top: "50%",
    transform: "translateY(-50%)",
  },
  bottom: {
    bottom: `${offset}px`,
    top: "unset",
  },
  top: {
    bottom: "unset",
    top: `${offset}px`,
  },
  right: {
    marginInline: "unset",
    marginInlineStart: "auto",
    top: "50%",
    transform: "translateY(-50%)",
    left: "unset",
  },
  "right-top": {
    marginInlineStart: "auto",
    top: `${offset}px`,
    left: "unset",
  },
  "right-bottom": {
    marginInlineStart: "auto",
    bottom: `${offset}px`,
    top: "unset",
    left: "unset",
  },
  left: {
    marginInline: "unset",
    top: "50%",
    transform: "translateY(-50%)",
    right: "unset",
    left: `${offset}px`,
  },
  "left-bottom": {
    marginInline: "unset",
    bottom: `${offset}px`,
    top: "unset",
    right: "unset",
    left: `${offset}px`,
  },
  "left-top": {
    marginInline: "unset",
    top: `${offset}px`,
    right: "unset",
    left: `${offset}px`,
  },
});
