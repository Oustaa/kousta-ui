import { useEffect, useState } from "react";
import { Button, ContextMenu, Menu, Input } from "@kousta-ui/components";
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
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    let timeout;
    if (loading) {
      timeout = setTimeout(() => {
        setLoading(false);
      }, 2000);
    }

    return clearTimeout(timeout);
  }, [loading]);

  return (
    <>
      <Button
        loading={loading}
        onClick={() => {
          sayHello();
          setLoading((prev) => !prev);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }}
      >
        Primary Button
      </Button>
      <br />
      <br />
      <Input
        label="Society"
        placeholder="this is my placeholder"
        // errors={["There is an error"]}
        required={true}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        // i should add this
        leftSection={
          <Button onClick={() => alert("Hello InputLeft Section")} />
        }
      />
      <br />
      <br />
      <Button
        varient="secondary"
        loading={loading}
        onClick={() => {
          sayHello();
          setLoading((prev) => !prev);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }}
      >
        Secondary Button
      </Button>
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
            closeOnClick: true,
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
      <Menu.Menu closeOnClick={false} offset={6} position="Bottom-Start">
        <Menu.Target>
          <Button>Menu Target Button</Button>
        </Menu.Target>
        <Menu.DropDown>
          <Menu.Label>Hello Application</Menu.Label>
          <Menu.Item
            leftSection={
              <div>
                <BsHouseLock />
              </div>
            }
            closeMenuOnClick={true}
          >
            Hello There 1
          </Menu.Item>
          <Menu.Item disabled={true}>Hello There 2</Menu.Item>
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
