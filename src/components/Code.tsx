import { Editor } from "@monaco-editor/react";
import { useStore } from "../store/store";
import { useContext } from "react";
import SocketContext from "../context/socketContext";
import InputContext from "../context/inputContext";
import { fontConfig } from "../constants/editorConfig";

type Props = {};

function Code({}: Props) {
  const activeLanguage = useStore((state) => state.language);
  const theme = useStore((state) => state.theme);
  const currentCode = useStore((state) => state.currentCode);
  const setCurrentCode = useStore((state) => state.setCurrentCode);
  const resetOutput = useStore((state) => state.resetOutput);
  const isRunning = useStore((state) => state.isRunning);
  const setIsRunning = useStore((state) => state.setIsRunning);

  const socket = useContext(SocketContext);
  const inputRef = useContext(InputContext);

  const handleCodeRun = () => {
    if (socket?.isConnected === false) return;

    if (isRunning) {
      socket?.sendJsonMessage({ command: "stop" });
      setIsRunning(false);
      inputRef.current = "";
      return;
    }
    socket?.sendJsonMessage({
      command: "run",
      code: currentCode.toString(),
      language: activeLanguage.toLocaleLowerCase(),
    });
    setIsRunning(true);
    resetOutput();
  };

  return (
    <div className="h-full w-full flex flex-col gap-2 p-2">
      <div className="flex items-center justify-between pe-2">
        <div className="text-white font-semibold flex items-center gap-2">
          <span className="block">Code: </span>
          <div
            className={`block w-3 h-3  rounded-full ${
              socket?.isConnected ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
        </div>
        <button
          className={`btn btn-sm ${isRunning ? "btn-error" : "btn-success"} ${
            socket?.isConnected ?? "btn-disabled cursor-not-allowed"
          }`}
          onClick={handleCodeRun}
        >
          {isRunning ? "Stop" : "Run"}
        </button>
      </div>
      <Editor
        language={activeLanguage.toLocaleLowerCase()}
        theme={theme}
        value={currentCode}
        onChange={(value) => setCurrentCode(value as string)}
        options={{
          readOnly: isRunning,
          readOnlyMessage: { value: "Stop code to edit..." },
          scrollBeyondLastLine: false,
          ...fontConfig,
          minimap: { enabled: false },
        }}
      />
    </div>
  );
}

export default Code;
