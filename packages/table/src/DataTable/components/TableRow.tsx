import { FC } from "react";
import { useTableContext } from "../tableContext";
import TableRowCol from "./TableRowCol";
import { Button, ContextMenu } from "@kousta-ui/components";
import {
  hasActions,
  hasDeleteAction,
  hasEditAction,
} from "../utils/tableAction";
import Table from "../../Table";

const TableRow: FC<{ row: Record<string, unknown>; index: number }> = ({
  row,
  index,
}) => {
  const { headers, options } = useTableContext();

  const contextMenuOptions = [];

  if (options && options.actions) {
    if (options.actions.delete)
      contextMenuOptions.push({
        title: "Delete",
        onClick: () => options!.actions!.delete!(row),
      });
    if (options.actions.edit)
      contextMenuOptions.push({
        title: "Edit",
        onClick: () => options!.actions!.edit!(row),
      });
  }

  return (
    <ContextMenu itemCloseOnClick={true} options={contextMenuOptions} As="tr">
      {Object.values(headers.data).map((headerValue) => {
        return (
          <TableRowCol
            key={`${headerValue.value} - table row - ${index}`}
            headerValue={headerValue}
            row={row}
          />
        );
      })}
      {hasActions(options) && (
        <Table.Td>
          {hasDeleteAction(options) && (
            <Button onClick={() => options!.actions!.delete!(row)}>
              delete
            </Button>
          )}
          {hasEditAction(options) && (
            <Button onClick={() => options!.actions!.edit!(row)}>Edit</Button>
          )}
        </Table.Td>
      )}
    </ContextMenu>
  );
};

export default TableRow;
