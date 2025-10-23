import { cloneElement, isValidElement, ReactNode, CSSProperties } from "react";

function mergeStyles(
  existing: CSSProperties | undefined,
  overrides: CSSProperties,
): CSSProperties {
  return { ...(existing || {}), ...overrides };
}

export function renderLeftSectionItem(item: ReactNode): ReactNode {
  if (isValidElement(item)) {
    return cloneElement(item, {
      style: mergeStyles(item.props.style, {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      }),
    });
  }

  return item;
}

export function renderRightSectionItem(item: ReactNode): ReactNode {
  if (isValidElement(item)) {
    return cloneElement(item, {
      style: mergeStyles(item.props.style, {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      }),
    });
  }

  return item;
}
