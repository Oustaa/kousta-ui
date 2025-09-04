import { useState } from "react";
import { useTableContext } from "../tableContext";

const TableSearch = () => {
  const { options } = useTableContext();
  const [q, setQ] = useState<string>("");

  if (!options?.search) return <></>;

  return (
    <div className="table-search-container">
      <input value={q} onChange={(e) => setQ(e.target.value)} />
    </div>
  );
};

export default TableSearch;
