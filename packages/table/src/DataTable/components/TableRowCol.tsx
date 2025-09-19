import { FC } from "react";
import Table from "../../Table";
import { THeaderValue } from "../@types/props";

import { getNestedProperty } from "@kousta-ui/helpers";

const TableRowCol: FC<{
  row: Record<string, any>;
  headerValue: THeaderValue;
}> = ({ headerValue, row }) => {
  let content: any;

  if (headerValue.visible === false || headerValue.canSee === false) return;

  if (headerValue.exec && typeof headerValue.exec === "function") {
    content = headerValue.exec(row);
  } else {
    content = getNestedProperty?.(row, headerValue.value);
  }

  return <Table.Td>{content || "--"}</Table.Td>;
};

export default TableRowCol;
