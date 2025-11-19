import { CSSProperties } from "react";
import { ModalPosition } from "./_props";

export const modalPositionStyle = (
  offset?: number,
): Record<ModalPosition, CSSProperties> => ({
  center: {
    marginInline: "auto",
    top: "50%",
    right: "50%",
    transform: "translateY(-50%) translateX(50%)",
  },
  bottom: {
    bottom: `${offset}px`,
    top: "unset",
    right: "50%",
    transform: "translateX(50%)",
  },
  top: {
    bottom: "unset",
    top: `${offset}px`,
    right: "50%",
    transform: "translateX(50%)",
  },
  right: {
    marginInline: "unset",
    marginInlineStart: "auto",
    top: "50%",
    transform: "translateY(-50%)",
    left: "unset",
    right: `${offset}px`,
  },
  "right-top": {
    marginInlineStart: "auto",
    top: `${offset}px`,
    left: "unset",
    right: `${offset}px`,
  },
  "right-bottom": {
    marginInlineStart: "auto",
    bottom: `${offset}px`,
    top: "unset",
    left: "unset",
    right: `${offset}px`,
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
