import { ReactNode } from "react";
import Table from "../../Table";
import { THeaderValue } from "../@types/props";

import { getNestedProperty } from "@kousta-ui/helpers";

const TableRowCol = <T extends Record<string, unknown>>({
  headerValue,
  row,
}: {
  row: T;
  headerValue: THeaderValue<T>;
}) => {
  let content: string | ReactNode;

  if (headerValue.visible === false || headerValue.canSee === false) return;

  if (headerValue.exec && typeof headerValue.exec === "function") {
    content = headerValue.exec(row);
  } else {
    content = getNestedProperty?.(
      row satisfies Record<string, unknown>,
      headerValue.value,
    );
  }

  return <Table.Td>{content || "--"}</Table.Td>;
};

export default TableRowCol;
