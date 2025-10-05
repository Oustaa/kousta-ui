import { useCallback, useState } from "react";
import { DataTable } from "@kousta-ui/table";
import { THeader } from "@kousta-ui/table/lib/DataTable/@types/props";
import { Input, Menu } from "@kousta-ui/components";
import { Bs123 } from "react-icons/bs";

import { users } from "./data/users";

import "@kousta-ui/table/esm/index.css";
import "@kousta-ui/components/esm/index.css";

export type UserType = {
  name: string;
  age: number;
  email: string;
  address?: string;
  location: { name: string };
};

const App = () => {
  const [data, setData] = useState<Array<UserType>>(users);

  const [headers, setHeaders] = useState<THeader<UserType>>({
    user: {
      value: "ema",
      exec(user) {
        return (
          <div>
            <h2>{user.email}</h2>
          </div>
        );
      },
      visible: false,
    },
    name: {
      value: "name",
      exec() {
        return "WHAAAAAAAAAA";
      },
      visible: false,
      // canSee: false,
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

  const searchHandler = useCallback(
    (q: string, { visibleHeaders: vh }: { visibleHeaders: string[] }) => {
      const reg = new RegExp(q);

      setData(() =>
        users.filter(
          (user) =>
            (vh?.includes("name") && reg.test(user.name)) ||
            (vh?.includes("email") && reg.test(user.email)) ||
            reg.test(user.address || "") ||
            reg.test(user.location.name),
        ),
      );
    },
    [],
  );

  return (
    <div style={{ width: "90%", marginInline: "auto", marginTop: "2rem" }}>
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
      <Input
        label="Society"
        placeholder="this is my placeholder"
        // errors={["There is an error"]}
        required={true}
        // value={value}
        // onChange={(e) => {
        //   setValue(e.target.value);
        // }}
        // i should add this
        // leftSection={<Button onClick={alert("Hello InputLeft Section")} />}
      />
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
          viewComp: {
            Component: (row) => {
              return <h2>{row.email}</h2>;
            },
            type: "Row",
            // modalOptions: {
            //   title: "Hello Extended Table",
            //   position: "top",
            //   offset: 80,
            // },
          },
          actions: {
            delete: {
              canDelete: (row) => {
                console.log({ row });
                return row?.age > 25;
              },
              onDelete: (row: UserType) => {
                console.log({ row });
              },
            },
            edit: {
              canEdit: true,
              onEdit: (row: UserType) => {
                console.log({ row });
              },
            },
          },
          extraActions: [
            {
              title: "Do Something",
              onClick: () => {},
              allowed: (row) => row.age < 23,
              Icon: <Bs123 />,
            },
          ],
          // emptyTable: <div style={{ color: "red" }}>Whaaat The fuck</div>,
          search: searchHandler,
        }}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Menu.Menu closeOnClick type="click">
        <Menu.Target>I AM A MENU</Menu.Target>
        <Menu.DropDown>
          <Menu.Label>Hello Application</Menu.Label>
          <Menu.Item closeMenuOnClick={false}>Dont Close</Menu.Item>
          <Menu.Item>Hello There 2</Menu.Item>
          <Menu.Item>Hello There 3</Menu.Item>
          <Menu.Divider />
          <Menu.Item>Hello There 4</Menu.Item>
          <Menu.Item>Hello There 5</Menu.Item>
        </Menu.DropDown>
      </Menu.Menu>
    </div>
  );
};

export default App;
