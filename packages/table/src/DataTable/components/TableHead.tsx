import { useTableContext } from "../tableContext";

import TableSearch from "./TableSearch";

const TableHead = () => {
  const { options } = useTableContext();

  // if (!options) return <></>;

  return (
    <div className="kui-table-head">
      {/* Hide Table Rows */}
      <TableSearch />
    </div>
  );
};

export default TableHead;
