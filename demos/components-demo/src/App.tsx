import { useEffect, useState } from "react";
import { Button, ContextMenu } from "@kousta-ui/components";
import { useSayHello } from "@kousta-ui/hooks";
import { BsAirplane } from "react-icons/bs";

import "./App.css";
import "./index.css";
import "@kousta-ui/components/styles.css";
import { RiFileExcel2Line } from "react-icons/ri";

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
                title: "Option 1 sub 1",
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
                    subOptions: [{ title: "Hello words ", onClick() {} }],
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
          // {
          //   type: "separator",
          // },
          {
            title: "Option number 3d sdfsdf",
            subOptions: [
              {
                closeOnClick: true,
                title: "Option 3 Sub 1",
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
    </>
  );
}

export default App;
