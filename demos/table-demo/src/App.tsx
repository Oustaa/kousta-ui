import { Table, DataTable } from "@kousta-ui/table";
import { THeader } from "@kousta-ui/table/lib/DataTable/@types/props";

import "@kousta-ui/table/styles.css";
import { useState } from "react";

type UserType = {
  name: string;
  age: number;
  email: string;
  address?: string;
};

const App = () => {
  const data: Array<UserType> = [
    {
      name: "Oussama Tailba",
      age: 27,
      email: "otailaba98@gmail.com",
      address: "Bab ghmat syba 37",
    },
    {
      name: "kaoutar Taki",
      age: 22,
      email: "ktaki@gmail.com",
    },
  ];

  const [headers, setHeaders] = useState<THeader>({
    user: {
      value: "email",
      exec(user: UserType) {
        return (
          <div>
            <h2>{user.name}</h2>
            <h3>{user.email}</h3>
          </div>
        );
      },
    },
    name: {
      value: "name",
      exec() {
        return "WHAAAAAAAAAA";
      },
    },
    age: {
      value: "age",
    },
    email: {
      value: "email",
    },
    address: {
      value: "address",
    },
  });

  return (
    <div style={{ width: "50%", marginInline: "auto", marginTop: "2rem" }}>
      <Table.Root>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Full Name</Table.Th>
            <Table.Th>Age</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Address</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((row, index) => {
            return (
              <Table.Tr key={index}>
                <Table.Td>{row.name}</Table.Td>
                <Table.Td>{row.age}</Table.Td>
                <Table.Td>{row.email}</Table.Td>
                <Table.Td>{row.address}</Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table.Root>
      <br />
      <br />
      <br />

      <DataTable
        data={data}
        headers={{
          data: headers,
          setHeaders,
        }}
        loading={false}
        title="this is a title"
      />
    </div>
  );
};

export default App;
