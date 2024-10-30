import { useEffect, useState } from "react";
import { Button } from "@kousta-ui/components";
import { useSayHello } from "@kousta-ui/hooks";

import "./App.css";
import "@kousta-ui/components/cjs/index.cjs.css";

function App() {
  const sayHello = useSayHello("Oussama Is the goat");
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, [loading]);

  return (
    <Button
      content={"Hello btn"}
      loading={loading}
      onClick={() => {
        sayHello();
        setLoading((prev) => !prev);
      }}
    />
  );
}

export default App;
