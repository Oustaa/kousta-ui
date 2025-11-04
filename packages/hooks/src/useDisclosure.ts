import { useState } from "react";

export const useDisclosure = (menuOpened: boolean = false) => {
  const [opened, setOpened] = useState<boolean>(menuOpened);

  const open = () => setOpened(true);
  const close = () => setOpened(false);
  const toggle = () => setOpened((prev) => !prev);

  return {
    opened,
    open,
    close,
    toggle,
  };
};
