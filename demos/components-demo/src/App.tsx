import { useEffect, useState } from "react";
import { Button, ContextMenu, Menu, Input, Modal } from "@kousta-ui/components";
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
import { useDisclosure } from "@kousta-ui/hooks";

function App() {
  const { opened, close, open } = useDisclosure(true);
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
      <Modal
        opened={opened}
        onClose={close}
        // modalTrigger={"Create Project In Modal"}
        title={
          <img
            style={{ width: "50px" }}
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/768px-LEGO_logo.svg.png"
            }
          />
        }
        // withCloseBtn={false}
        // withBackdrop={false}
        // beforeClose={() => {
        //   alert("How are you??");
        //   // return false;
        // }}
        position="left"
        size="450"
        offset={0}
        // fullHeight
        // fullWidth
      >
        Hello I Am A Modal Hello I Am A Modal Hello I Am A Modal Hello I Am A
        Modal Hello I Am A Modal Hello I Am A Modal Hello I Am A Modal Hello I
        Am A Modal
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
        cs dsfdsg f
      </Modal>
      <Button
        loading={loading}
        onClick={() => {
          setLoading((prev) => !prev);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }}
      >
        Primary Button
      </Button>
      <br />
      <Button onClick={open}>Open Modal</Button>

      <br />
      <Input
        label="Society"
        placeholder="this is my placeholder"
        errors={["There is an error"]}
        required={true}
        // type="numbenumberr"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        // i should add this
        leftSection={
          <Button onClick={() => alert("Hello InputLeft Section")}>
            dfdfh
          </Button>
        }
      />
      <br />
      <br />
      <Button
        varient="secondary"
        loading={loading}
        onClick={() => {
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
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
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
