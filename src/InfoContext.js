import { createContext } from "react";

const InfoContext = createContext({
  position: 0,
  setPosition: () => {}
});

export default InfoContext;
