import { FC } from "react";

import Table from "../../Table";
import { useTableContext } from "../tableContext";
import { getShownHeders } from "../utils/getShownHeaders";
import { hasActions, hasBulkActions } from "../utils/tableAction";

const EmptyTable: FC = () => {
  const { options, headers } = useTableContext();

  return (
    <Table.Tbody>
      <Table.Tr>
        <Table.Td
          colSpan={
            getShownHeders(headers.data).length +
            Number(hasActions(options)) +
            Number(hasBulkActions(options))
          }
        >
          {options && options.emptyTable
            ? options.emptyTable
            : "No Data in the table"}
        </Table.Td>
      </Table.Tr>
    </Table.Tbody>
  );
};

export default EmptyTable;
