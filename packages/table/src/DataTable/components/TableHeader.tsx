import { useState } from "react";
import Table from "../../Table";
import { useTableContext } from "../tableContext";
import { hasActions, hasBulkActions } from "../utils/tableAction";
import { Menu } from "@kousta-ui/components";

function TableHeader() {
  const [allSelected, setAllSelected] = useState<boolean>(false);
  // const [filterFunction, setFilterFunction] = useState<
  //   // eslint-disable-next-line
  //   Record<string, (row: any) => boolean>
  // >({});

  const { data, headers, options, rowSelection } = useTableContext();

  const headersLabel = Object.keys(headers.data).filter((header) => {
    return (
      headers.data[header].visible !== false &&
      headers.data[header].canSee !== false
    );
  });

  const selectAll = (cb?: (row: unknown) => boolean) => {
    data.map((row, index) => {
      // const filterFunctions = Object.values(filterFunction);
      //
      // if (filterFunctions.length) {
      //   if (filterFunctions.some((func) => func(row)))
      //     rowSelection.setSelectedRows(index, row);
      // } else {
      //   rowSelection.setSelectedRows(index, row);
      // }
      if (!cb) {
        rowSelection.setSelectedRows(index, row, true);
      } else if (cb(row)) {
        rowSelection.setSelectedRows(index, row, true);
      }
    });
  };

  return (
    <Table.Thead>
      <Table.Tr>
        {hasBulkActions(options) && (
          <Table.Th>
            {options?.selectFilter &&
            Object.keys(options.selectFilter).length > 0 ? (
              <Menu.Menu>
                <Menu.Target>
                  <button onClick={(e) => e.stopPropagation()}>
                    <input
                      checked={allSelected}
                      onChange={() => {
                        setAllSelected((prev) => !prev);
                        selectAll();
                      }}
                      type="checkbox"
                    />
                  </button>
                  <button>More</button>
                </Menu.Target>
                <Menu.DropDown>
                  {Object.keys(options?.selectFilter || {}).map((key) => (
                    <Menu.Item>
                      <input
                        type="checkbox"
                        // checked={key in filterFunction}
                        onChange={() => {
                          selectAll(options?.selectFilter?.[key]);

                          // // @ts-expect-error this is not an error
                          // setFilterFunction((prev) => {
                          //   if (key in filterFunction) {
                          //     // eslint-disable-next-line
                          //     const { key: _deleted, ...rest } = prev;
                          //     return rest;
                          //   }
                          //
                          //   return {
                          //     ...prev,
                          //     [key]: options?.selectFilter?.[key],
                          //   };
                          // });
                        }}
                      />
                      {key}
                    </Menu.Item>
                  ))}
                </Menu.DropDown>
              </Menu.Menu>
            ) : (
              <>
                <input
                  checked={allSelected}
                  onChange={() => {
                    setAllSelected((prev) => !prev);
                    selectAll();
                  }}
                  type="checkbox"
                />
              </>
            )}
          </Table.Th>
        )}
        {headersLabel.map((header, index) => {
          return (
            <Table.Th
              aria-checked="true"
              role="th"
              key={`${header} - ${index}`}
            >
              {header.toUpperCase()}
            </Table.Th>
          );
        })}
        {hasActions(options) && <Table.Th>ACTIONS</Table.Th>}
      </Table.Tr>
    </Table.Thead>
  );
}

export default TableHeader;
