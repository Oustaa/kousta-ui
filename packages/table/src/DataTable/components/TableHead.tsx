import { useTableContext } from "../tableContext";
import { Menu } from "@kousta-ui/components";

import classes from "../DataTable.module.css";

import TableSearch from "./TableSearch";

const TableHead = () => {
  const { headers } = useTableContext();

  const visibleHeaders = Object.keys(headers.data).filter(
    (header) =>
      headers.data[header].visible !== false &&
      headers.data[header].canSee !== false,
  );

  const headersCanSee = Object.keys(headers.data).filter(
    (header) => headers.data[header].canSee !== false,
  );

  return (
    <div className={classes["kui-table-head"]}>
      <div className={classes["kui-table-head-section"]}>
        {/* Hide Table Rows */}
        <Menu.Menu closeItemOnClick={false}>
          <Menu.Target>S/H</Menu.Target>
          <Menu.DropDown>
            {headersCanSee.map((headerName) => (
              <Menu.Item key={headerName}>
                <div className={classes["kui-table-head_sh_label"]}>
                  <input
                    id={headerName}
                    type="checkbox"
                    checked={visibleHeaders.includes(headerName)}
                    onChange={(event) => {
                      headers.setHeaders((prev) => ({
                        ...prev,
                        [headerName]: {
                          ...prev[headerName],
                          visible: event.target.checked,
                        },
                      }));
                    }}
                  />
                  <label htmlFor={headerName}>{headerName.toUpperCase()}</label>
                </div>
              </Menu.Item>
            ))}
          </Menu.DropDown>
        </Menu.Menu>
        <TableSearch />
      </div>
    </div>
  );
};

export default TableHead;
