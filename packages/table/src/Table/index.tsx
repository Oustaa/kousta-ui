import React, { ComponentPropsWithRef, FC, PropsWithChildren } from "react";

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
    <table {...rest} className="kui-table">
      {children}
    </table>
  );
};

const Thead: FC<PropsWithChildren<ComponentPropsWithRef<"thead">>> = ({
  children,
  ...rest
}) => {
  return (
    <thead {...rest} className="kui-thead">
      {children}
    </thead>
  );
};

const Tbody: FC<PropsWithChildren<ComponentPropsWithRef<"tbody">>> = ({
  children,
  ...rest
}) => {
  return (
    <tbody {...rest} className="kui-tbody">
      {children}
    </tbody>
  );
};

const Tr: FC<PropsWithChildren<ComponentPropsWithRef<"tr">>> = ({
  children,
  ...rest
}) => {
  return (
    <tr {...rest} className="kui-tr">
      {children}
    </tr>
  );
};

const Th: FC<PropsWithChildren<ComponentPropsWithRef<"th">>> = ({
  children,
  ...rest
}) => {
  return (
    <th {...rest} className="kui-th">
      {children}
    </th>
  );
};

const Td: FC<PropsWithChildren<ComponentPropsWithRef<"td">>> = ({
  children,
  ...rest
}) => {
  return (
    <td {...rest} className="kui-td">
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
