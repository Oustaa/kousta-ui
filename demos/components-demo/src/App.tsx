import { useEffect, useState } from "react";
import { Button, ContextMenu, Menu } from "@kousta-ui/components";
import { useSayHello } from "@kousta-ui/hooks";
import {
  Bs123,
  BsAirplane,
  BsAlphabet,
  BsAmazon,
  BsArchive,
  BsHouseLock,
} from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";

import "@kousta-ui/components/esm/index.css";
import "./App.css";
import "./index.css";

function App() {
  const sayHello = useSayHello("Oussama Is the goat");
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [loading]);

  return (
    <>
      <Button
        content={"Hello btn"}
        loading={loading}
        onClick={() => {
          sayHello();
          setLoading((prev) => !prev);
        }}
      />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <ContextMenu
        itemCloseOnClick={false}
        options={[
          {
            title: "Export to excel",
            icon: <RiFileExcel2Line />,
            subOptions: [
              {
                title: "Option 1 sub 1 er",
                icon: <BsAlphabet />,
                subOptions: [
                  {
                    title: "Option 1 sub 1 sub 1",
                    onClick() {
                      console.log("Option 1 sub 1");
                    },
                  },
                ],
              },
              {
                optionType: "Separator",
              },
              {
                title: "Option 1 sub 2",
                onClick() {
                  console.log("Option 1 sub 2");
                },
                active: false,
              },
              {
                title: "Option 1 sub 3",
                subOptions: [
                  {
                    title: "Option 1 sub 3 sub 1",
                    subOptions: [
                      {
                        title: "Hello words ",
                        icon: <BsHouseLock />,

                        onClick() {
                          console.log("Hello words ");
                        },
                      },
                    ],
                  },
                ],
              },
              {
                title: "Option 1 sub 4",
                onClick() {
                  console.log("Option 1 sub 4");
                },
                closeOnClick: false,
              },
              {
                title: "Option 1 sub 5",
                onClick() {
                  console.log("Option 1 sub 5");
                },
              },
            ],
          },
          {
            title: "Option number 2",
            onClick() {
              console.log("Option number 2");
            },
            icon: <BsAirplane />,
          },
          {
            optionType: "Separator",
          },
          {
            title: "Option number 3",
            subOptions: [
              {
                closeOnClick: true,
                title: "Option 3 Sub 1",
                icon: <Bs123 />,
                onClick() {
                  console.log("Option 3 sub 1");
                },
              },
            ],
          },
          {
            title: "Option number 3",
            icon: <BsAmazon />,
            subOptions: [
              {
                closeOnClick: true,
                title: "Option 3 Sub 1",
                icon: <Bs123 />,
                onClick() {
                  console.log("Option 3 sub 1");
                },
              },
            ],
          },
          {
            optionType: "Separator",
          },
          {
            optionType: "Group",
            groupTitle: "Hello World",
          },
          {
            title: "Option number 3",
            icon: <BsArchive />,
            subOptions: [
              {
                closeOnClick: true,
                title: "Option 3 Sub 1",
                icon: <Bs123 />,
                onClick() {
                  console.log("Option 3 sub 1");
                },
              },
            ],
          },
        ]}
      >
        Hello there sdfgdjh fdbkj hreghdf hjkghre oyuigdsfg khrklg dfhbgjkfd
        hkjgh jkldsfagkhja fghjhldsfg ewyufghjddhjafg dsjhkfghds jfagsdhjf
        gew8fg dsyfage hjkfgsdhjkf agweufy ds gew8fg dsyfage hjkfgsdhjkf agweufy
        ds gew8fg dsyfage hjkfgsdhjkf agweufy ds gew8fg dsyfage hjkfgsdhjkf
        agweufy ds gew8fg dsyfage hjkfgsdhjkf agweufy ds
      </ContextMenu>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Menu.Menu type="click">
        <Menu.Target>Hello there motherfucker</Menu.Target>
        <Menu.DropDown>
          <Menu.Label>Hello Application</Menu.Label>
          <Menu.Item>Hello There 1</Menu.Item>
          <Menu.Item>Hello There 2</Menu.Item>
          <Menu.Item>Hello There 3</Menu.Item>
          <Menu.Divider />
          <Menu.Item>Hello There 4</Menu.Item>
          <Menu.Item>Hello There 5</Menu.Item>
        </Menu.DropDown>
      </Menu.Menu>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}

export default App;
