import { useEffect, useState } from "react";
import { Button, ContextMenu } from "@kousta-ui/components";
import { useSayHello } from "@kousta-ui/hooks";

import "./App.css";
import "@kousta-ui/components/styles.css";

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

      <ContextMenu
        options={[
          {
            title: "Option number 1",
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
                active: true,
                subOptions: [
                  {
                    title: "Option 1 sub 3 sub 1",
                    onClick() {
                      console.log("Option 1 sub 3 sub 1");
                    },
                  },
                ],
              },
              {
                title: "Option 1 sub 4",
                onClick() {
                  console.log("Option 1 sub 4");
                },
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
          },
          {
            title: "Option number 3",
            subOptions: [
              {
                title: "Option 3 Sub 1",
                onClick() {
                  console.log("Option 3 sub 1");
                },
              },
            ],
          },
        ]}
      >
        Hello there
      </ContextMenu>
    </>
  );
}

export default App;
