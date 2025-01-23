import { useState } from "react";
import useWebSocket, { Options } from "react-use-websocket";
import { SendJsonMessage } from "react-use-websocket/dist/lib/types";
import useUpdateEffect from "./useUpdateEffect";

type websocketResponseType = {
  message?: string;
  type: string;
  data?: string;
  input_data?: string;
};

type Props = {
  url: string;
  onMessage: (
    msg: websocketResponseType,
    sendJsonMessage: SendJsonMessage
  ) => void;
  options?: Options;
};

const BaseWebsocketUrl = "wss://compiler.skillshikshya.com/ws";

export default function useCustomWebsocket({
  url,
  onMessage,
  options = {},
}: Props) {
  const [isConnected, setIsConnected] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const maxRetries = 3;

  const socket = useWebSocket<websocketResponseType>(BaseWebsocketUrl + url, {
    onOpen: () => {
      setIsConnected(true);
    },
    retryOnError: true,
    shouldReconnect: () => {
      if (reconnectAttempts > maxRetries) {
        setReconnectAttempts(0);
        return false;
      }
      setReconnectAttempts((prev) => prev + 1);
      return true;
    },
    reconnectAttempts: 3,
    reconnectInterval: (attemptNumber) =>
      Math.min(Math.pow(2, attemptNumber) * 1000, 10000),
    onReconnectStop: () => {
      setIsConnected(false);
    },
    ...options,
  });

  useUpdateEffect(() => {
    if (socket.lastJsonMessage === null) return;
    onMessage(socket.lastJsonMessage, socket.sendJsonMessage);
  }, [socket.lastJsonMessage]);

  return { ...socket, isConnected };
}
