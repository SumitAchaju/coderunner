import { createContext, useRef } from "react";

const InputContext = createContext({
  current: "",
});

type Props = {
  children: React.ReactNode;
};

export default InputContext;

export function InputProvider({ children }: Props) {
  const inputRef = useRef("");

  return (
    <InputContext.Provider value={inputRef}>{children}</InputContext.Provider>
  );
}
