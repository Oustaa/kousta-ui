import { Table } from "@kousta-ui/table";
import { getNestedProperty, updateNestedProperties } from "@kousta-ui/helpers";

import "@kousta-ui/table/styles.css";

const App = () => {
  const obj = {
    name: "Kousta ui",
    versions: {
      number: 123,
      name: "@latest",
      date: {
        year: 2024,
        month: 11,
        days: [1, 2, 3, 4, 5],
      },
    },
  };

  updateNestedProperties(obj, "versions.name", "@patch-344");

  const name = getNestedProperty(obj, "versions.name") as string;

  return (
    <div>
      <h1>{name}</h1>
      <Table
        data={[
          {
            id: 1234,
            name: "dfdsfds",
          },
        ]}
      />
    </div>
  );
};

export default App;
