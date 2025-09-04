import { FC } from "react";
import { useTableContext } from "../tableContext";
import TableRowCol from "./TableRowCol";
import { ContextMenu } from "@kousta-ui/components";

const TableRow: FC<{ row: Record<string, unknown>; index: number }> = ({
  row,
  index,
}) => {
  const { headers } = useTableContext();

  return (
    <ContextMenu
      itemCloseOnClick={true}
      options={[
        { title: "Delete", onClick: () => console.log("Delete") },
        { title: "Edit", onClick: () => console.log("Edit") },
      ]}
      As="tr"
    >
      {Object.values(headers.data).map((headerValue) => {
        return (
          <TableRowCol
            key={`${headerValue.value} - table row - ${index}`}
            headerValue={headerValue}
            row={row}
          />
        );
      })}
    </ContextMenu>
  );
};

export default TableRow;
