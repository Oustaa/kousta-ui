import React, { ComponentPropsWithRef, FC, PropsWithChildren } from "react";

import classes from "./Table.module.css";

const Table: FC<PropsWithChildren<ComponentPropsWithRef<"table">>> = ({
  children,
  ...rest
}) => {
  if (!children || (Array.isArray(children) && children.length === 0)) {
    throw new Error("Table must have at least one child");
  }

  if (
    !React.isValidElement(children) &&
    !(Array.isArray(children) && children.every(React.isValidElement))
  ) {
    throw new Error("Invalid child component provided to Table");
  }
  return (
    <table role="table" {...rest} className={classes["kui-table"]}>
      {children}
    </table>
  );
};

const Thead: FC<PropsWithChildren<ComponentPropsWithRef<"thead">>> = ({
  children,
  ...rest
}) => {
  return (
    <thead {...rest} className={classes["kui-thead"]}>
      {children}
    </thead>
  );
};

const Tbody: FC<PropsWithChildren<ComponentPropsWithRef<"tbody">>> = ({
  children,
  ...rest
}) => {
  return (
    <tbody {...rest} className={classes["kui-tbody"]}>
      {children}
    </tbody>
  );
};

const Tr: FC<PropsWithChildren<ComponentPropsWithRef<"tr">>> = ({
  children,
  ...rest
}) => {
  return (
    <tr {...rest} role="tr" className={classes["kui-tr"]}>
      {children}
    </tr>
  );
};

const Th: FC<PropsWithChildren<ComponentPropsWithRef<"th">>> = ({
  children,
  ...rest
}) => {
  return (
    <th {...rest} className={classes["kui-th"]}>
      {children}
    </th>
  );
};

const Td: FC<PropsWithChildren<ComponentPropsWithRef<"td">>> = ({
  children,
  ...rest
}) => {
  return (
    <td {...rest} className={classes["kui-td"]}>
      {children}
    </td>
  );
};

export default {
  Root: Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
};
