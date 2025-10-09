import { useTableContext } from "../tableContext";
import Table from "../../Table";

const TableRowCheckbox = <T extends Record<string, unknown>>({
  row,
  index,
}: {
  row: T;
  index: number;
}) => {
  const { rowSelection } = useTableContext();

  return (
    <Table.Td>
      <input
        type="checkbox"
        checked={index in rowSelection.selectedRows}
        onChange={() => {
          rowSelection.setSelectedRows(index, row);
        }}
      />
    </Table.Td>
  );
};

export default TableRowCheckbox;
