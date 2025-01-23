import { ReactNode, createContext } from "react";
import { useStore } from "../store/store";
import useCustomWebsocket from "../hooks/useCustomWebsocket";

type Props = {
  children: ReactNode;
};

export type contextType = ReturnType<typeof useCustomWebsocket> | null;

const SocketContext = createContext<contextType | null>(null);
export default SocketContext;

export function SocketProvider({ children }: Props) {
  const updateOutput = useStore((state) => state.updateOutput);
  const setIsRunning = useStore((state) => state.setIsRunning);

  const socket = useCustomWebsocket({
    url: "/compiler/",
    onMessage: (msg, sendJsonMessage) => {
      if (msg.type === "stdout" || msg.type === "stderr") {
        updateOutput(msg.data ?? "");
      }
      if (msg.type === "error") {
        sendJsonMessage({ command: "stop" });
        updateOutput(msg.data ?? "");
        setIsRunning(false);
      }
    },
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
