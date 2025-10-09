import { useTableContext } from "../tableContext";
import TableRowCol from "./TableRowCol";
import {
  Button,
  ContextMenu,
  ContextMenuTypeOption,
  Modal,
} from "@kousta-ui/components";

import {
  canPerformActionResolver,
  hasActions,
  hasBulkActions,
  hasDeleteAction,
  hasEditAction,
} from "../utils/tableAction";
import Table from "../../Table";

import classes from "../DataTable.module.css";
import { ReactNode } from "react";
import { useDisclosure } from "@kousta-ui/hooks";
import { getShownHeders } from "../utils/getShownHeaders";
import TableRowCheckbox from "./TableRowSelect";

const TableRow = <T extends Record<string, unknown>>({
  row,
  index,
}: {
  row: T;
  index: number;
}) => {
  const { open, opened, close, toggle } = useDisclosure(false);
  const { headers, options } = useTableContext();

  const contextMenuOptions: ContextMenuTypeOption[] = [];
  const tableActions: ReactNode[] = [];

  if (options && options.actions) {
    if (hasDeleteAction(options, row)) {
      contextMenuOptions.push({
        title: "Delete",
        onClick: () => options!.actions!.delete?.onDelete!(row),
      });

      tableActions.push(
        <Button onClick={() => options!.actions!.delete?.onDelete!(row)}>
          delete
        </Button>,
      );
    }
    if (hasEditAction(options)) {
      contextMenuOptions.push({
        title: "Edit",
        onClick: () => options!.actions!.edit?.onEdit!(row),
      });
      tableActions.push(
        <Button onClick={() => options!.actions!.edit?.onEdit!(row)}>
          Edit
        </Button>,
      );
    }
    if (options?.viewComp) {
      if (options.viewComp.type === "Modal") {
        contextMenuOptions.push({
          title: "Open Modal",
          onClick: open,
        });
      } else {
        contextMenuOptions.push({
          title: "Extend",
          onClick: () => alert("Extend Table Row"),
        });
      }
    }

    if (options.extraActions && options.extraActions.length > 0) {
      options.extraActions.forEach((action) => {
        if (canPerformActionResolver(row, action.allowed)) {
          contextMenuOptions.push({
            title: action.title,
            icon: action.Icon,
            active: canPerformActionResolver(row, action.allowed),
            onClick: action.onClick.bind(this, row),
          });
          tableActions.push(
            canPerformActionResolver(row, action.allowed) && (
              <Button onClick={() => options!.actions!.edit?.onEdit!(row)}>
                {action.Icon} {action.title}
              </Button>
            ),
          );
        }
      });
    }
  }

  if (options?.viewComp) {
    if (options.viewComp.type === "Modal") {
      tableActions.push(<Button onClick={open}>Open Modal</Button>);
    } else {
      tableActions.push(<Button onClick={toggle}>Extends</Button>);
    }
  }

  return (
    <>
      {options?.viewComp?.type === "Modal" && (
        // @ts-expect-error this is not an error
        <Modal
          withCloseBtn={false}
          opened={opened}
          onClose={close}
          {...options.viewComp.modalOptions}
        >
          {options?.viewComp?.Component(row)}
        </Modal>
      )}

      <ContextMenu itemCloseOnClick={true} options={contextMenuOptions} As="tr">
        {hasBulkActions(options) && (
          <TableRowCheckbox index={index} row={row} />
        )}
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

      {options?.viewComp?.type === "Row" && opened && (
        <Table.Tr>
          <Table.Td
            colSpan={
              getShownHeders(headers.data)?.length +
              (hasActions(options) ? 1 : 0)
            }
          >
            {options?.viewComp?.Component(row)}
          </Table.Td>
        </Table.Tr>
      )}
    </>
  );
};

export default TableRow;
