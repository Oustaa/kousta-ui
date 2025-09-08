import { useState } from "react";
import { DataTable } from "@kousta-ui/table";
import { THeader } from "@kousta-ui/table/lib/DataTable/@types/props";

import "@kousta-ui/table/styles.css";
// import "@kousta-ui/components/styles.css";

type UserType = {
  name: string;
  age: number;
  email: string;
  address?: string;
  location: { name: string };
};

const App = () => {
  const data: Array<UserType> = [
    {
      name: "Oussama Tailba",
      age: 27,
      email: "otailaba98@gmail.com",
      address: "Bab ghmat syba 37",
      location: { name: "Hello Location" },
    },
    {
      name: "kaoutar Taki",
      age: 22,
      email: "ktaki@gmail.com",
      location: { name: "Hello Ny Fucking Location" },
    },
  ];

  const [headers, setHeaders] = useState<THeader>({
    user: {
      value: "ema",
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
    local: {
      value: "location.name",
    },
  });

  return (
    <div style={{ width: "50%", marginInline: "auto", marginTop: "2rem" }}>
      {/* <Table.Root> */}
      {/*   <Table.Thead> */}
      {/*     <Table.Tr> */}
      {/*       <Table.Th>Full Name</Table.Th> */}
      {/*       <Table.Th>Age</Table.Th> */}
      {/*       <Table.Th>Email</Table.Th> */}
      {/*       <Table.Th>Address</Table.Th> */}
      {/*     </Table.Tr> */}
      {/*   </Table.Thead> */}
      {/*   <Table.Tbody> */}
      {/*     {data.map((row, index) => { */}
      {/*       return ( */}
      {/*         <Table.Tr key={index}> */}
      {/*           <Table.Td>{row.name}</Table.Td> */}
      {/*           <Table.Td>{row.age}</Table.Td> */}
      {/*           <Table.Td>{row.email}</Table.Td> */}
      {/*           <Table.Td>{row.address}</Table.Td> */}
      {/*         </Table.Tr> */}
      {/*       ); */}
      {/*     })} */}
      {/*   </Table.Tbody> */}
      {/* </Table.Root> */}
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
        options={{
          search: (q) => {
            alert(q);
          },
        }}
      />
    </div>
  );
};

export default App;
