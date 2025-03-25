import { Table } from "@kousta-ui/table";

import "@kousta-ui/table/styles.css";

const App = () => {
  const data = [
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
      address: "Bab ghmat syba 37",
    },
  ];

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
    </div>
  );
};

export default App;
