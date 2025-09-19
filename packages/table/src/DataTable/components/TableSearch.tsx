import { useState } from "react";
import { useTableContext } from "../tableContext";

const TableSearch = () => {
  const { options } = useTableContext();
  const [q, setQ] = useState<string>("");

  if (!options || !options.search) return <></>;

  return (
    <div className="table-search-container">
      <input value={q} onChange={(e) => setQ(e.target.value)} />
      <button
        onClick={() => {
          options.search?.(q);
        }}
      >
        Search
      </button>
    </div>
  );
};

export default TableSearch;
