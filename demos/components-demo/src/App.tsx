import { useEffect, useState } from "react";
import {
  Button,
  ContextMenu,
  Menu,
  Input,
  Modal,
  ComponentPropsProvider,
} from "@kousta-ui/components";
import {
  Bs123,
  BsAlphabet,
  BsAmazon,
  BsArchive,
  BsHouseLock,
} from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";

import "@kousta-ui/components/esm/index.css";
import "./App.css";
import "./index.css";
import { useDisclosure, useScrollLock } from "@kousta-ui/hooks";

function App() {
  const { lockScroll, unlockScroll } = useScrollLock();
  const { opened, close, open } = useDisclosure(false);
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
      <ComponentPropsProvider
        button={{
          size: "sm",
          // variant: "mine",
          type: "submit",
          // className: "btn-class",
          variants: {
            mine: {
              style: {
                backgroundColor: "red",
                color: "green",
              },
            },
          },
        }}
        menu={{
          menu: {
            type: "click",
            closeOnClick: false,
            position: "Top-Center",
            offset: 0,
          },
          menuItem: {},
        }}
        modal={{
          closeOnClickOutside: false,
          closeOnClickEsc: false,
          withCloseBtn: false,
          withBackdrop: false,
          position: "top",
          offset: 20,
          size: "lg",
        }}
      >
        <Button type={"reset"}>Mine Button</Button>
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
          // closeOnClickEsc={true}
          closeOnClickOutside={true}
          // withCloseBtn={false}
          // withBackdrop={false}
          // beforeClose={() => {
          //   alert("How are you??");
          //   // return false;
          // }}
          position="left"
          size="480"
          offset={10}
          fullHeight
          // fullWidth
        >
          Hello I Am A Modal Hello I Am A Modal Hello I Am A Modal Hello I Am A
          Modal Hello I Am A Modal Hello I Am A Modal Hello I Am A Modal Hello I
          Am A Modal cs dsfdsg f
        </Modal>

        <Button
          loading={loading}
          onClick={() => {
            setLoading((prev) => !prev);
            setTimeout(() => {
              setLoading(false);
            }, 2000);
          }}
          variant="neutral-light"
          size="sm"
        >
          Primary Button
        </Button>
        <br />
        <br />
        <Button size={"md"} onClick={open}>
          Open Modal
        </Button>

        <br />
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
              left
            </Button>
          }
          rightSection={
            <Button onClick={() => alert("Hello InputLeft Section")}>
              right
            </Button>
          }
        />
        <br />
        <br />

        <Button
          variant="danger"
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

        <ContextMenu
          // itemCloseOnClick={false}
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
                      closeOnClick: false,
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
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </ContextMenu>
        <br />
        <br />

        {/* <Menu.Menu */}
        {/*   // position="Top-Center" */}
        {/*   closeOnClick={false} */}
        {/* > */}
        {/*   <Menu.Target> */}
        {/*     <Button>Menu Target Button</Button> */}
        {/*   </Menu.Target> */}
        {/*   <Menu.DropDown> */}
        {/*     <Menu.Label>Hello Application</Menu.Label> */}
        {/*     <Menu.Item */}
        {/*       leftSection={ */}
        {/*         <div> */}
        {/*           <BsHouseLock /> */}
        {/*         </div> */}
        {/*       } */}
        {/*       closeMenuOnClick={true} */}
        {/*     > */}
        {/*       Hello There 1 */}
        {/*     </Menu.Item> */}
        {/*     <Menu.Item disabled={true}>Hello There 2</Menu.Item> */}
        {/*     <Menu.Item>Hello There 3</Menu.Item> */}
        {/*     <Menu.Divider /> */}
        {/*     <Menu.Item>Hello There 4</Menu.Item> */}
        {/*     <Menu.Item>Hello There 5</Menu.Item> */}
        {/*   </Menu.DropDown> */}
        {/* </Menu.Menu> */}
        <br />
        <br />

        <Button variant="success-light" onClick={open}>
          Open Modal
        </Button>
        <Modal
          offset={24}
          withBackdrop={true}
          closeOnClickOutside={true}
          // closeOnClickEsc={true}
          modalTriggerBtnVariant="success-outline"
          modalTrigger="Open Me"
        >
          Hello there
        </Modal>
        <br />
        <br />

        <Menu.Menu offset={4} position="Left-Start" closeOnClick={true}>
          <Menu.Target>
            <Button>Menu</Button>
          </Menu.Target>
          <Menu.DropDown>
            <Menu.Item closeMenuOnClick={false}>Menu Item 1</Menu.Item>
            <Menu.Item>Menu Item 2</Menu.Item>
            <Menu.Item>Menu Item 3</Menu.Item>
          </Menu.DropDown>
        </Menu.Menu>
        <br />
        <br />

        <Button variant="danger-light" onClick={lockScroll}>
          Disable Scroll
        </Button>
        <Button variant="warning-light" onClick={unlockScroll}>
          Enable Scroll
        </Button>
      </ComponentPropsProvider>
    </>
  );
}

export default App;
