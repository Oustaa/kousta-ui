import { FC } from "react";
import Table from "../../Table";
import { THeaderValue } from "../@types/props";

import { getNestedProperty } from "@kousta-ui/helpers";

const TableRowCol: FC<{
  row: Record<string, unknown>;
  headerValue: THeaderValue;
}> = ({ headerValue, row }) => {
  const value = getNestedProperty?.(row, headerValue.value);
  // const value = row[headerValue.value];

  console.log({ value });

  // @ts-expect-error sdfdf
  return <Table.Td>{value}</Table.Td>;
};

export default TableRowCol;
