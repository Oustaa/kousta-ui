import { useTableContext } from "../tableContext";
import TableRowCol from "./TableRowCol";
import {
  Button,
  ContextMenu,
  ContextMenuTypeOption,
} from "@kousta-ui/components";

import {
  canPerformActionResolver,
  hasActions,
  hasDeleteAction,
  hasEditAction,
} from "../utils/tableAction";
import Table from "../../Table";

import classes from "../DataTable.module.css";
import { ReactNode } from "react";

const TableRow = <T extends Record<string, unknown>>({
  row,
  index,
}: {
  row: T;
  index: number;
}) => {
  const { headers, options } = useTableContext();

  const contextMenuOptions: ContextMenuTypeOption[] = [];

  if (options && options.actions) {
    if (hasDeleteAction(options, row))
      contextMenuOptions.push({
        title: "Delete",
        onClick: () => options!.actions!.delete?.onDelete!(row),
      });
    if (hasEditAction(options))
      contextMenuOptions.push({
        title: "Edit",
        onClick: () => options!.actions!.edit?.onEdit!(row),
      });

    if (options.extraActions && options.extraActions.length > 0) {
      options.extraActions.forEach((action) => {
        contextMenuOptions.push({
          title: action.title,
          icon: action.Icon,
          active: canPerformActionResolver(row, action.allowed),
          onClick: action.onClick.bind(this, row),
        });
      });
    }
  }

  const tableActions: ReactNode[] = [];

  if (hasDeleteAction(options, row))
    tableActions.push(
      <Button onClick={() => options!.actions!.delete?.onDelete!(row)}>
        delete
      </Button>,
    );

  if (hasEditAction(options))
    tableActions.push(
      <Button onClick={() => options!.actions!.edit?.onEdit!(row)}>
        Edit
      </Button>,
    );

  if (options?.extraActions)
    options!.extraActions?.forEach((action) =>
      tableActions.push(
        canPerformActionResolver(row, action.allowed) && (
          <Button onClick={() => options!.actions!.edit?.onEdit!(row)}>
            {action.Icon} {action.title}
          </Button>
        ),
      ),
    );

  return (
    <ContextMenu itemCloseOnClick={true} options={contextMenuOptions} As="tr">
      {Object.values(headers.data).map((headerValue) => {
        return (
          <TableRowCol<T>
            key={`${headerValue.value} - table row - ${index}`}
            headerValue={headerValue}
            row={row}
          />
        );
      })}
      {hasActions(options) && (
        <Table.Td className={classes["table-actions-container"]}>
          {tableActions.length > 0 ? tableActions : "--"}
        </Table.Td>
      )}
    </ContextMenu>
  );
};

export default TableRow;
