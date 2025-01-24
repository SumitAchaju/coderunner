import { Editor } from "@monaco-editor/react";
import { useStore } from "../store/store";
import { useContext, useEffect, useRef } from "react";
import InputContext from "../context/inputContext";
import SocketContext from "../context/socketContext";
import { fontConfig } from "../constants/editorConfig";

type Props = {};

function Output({}: Props) {
  const theme = useStore((state) => state.theme);
  const activeLanguage = useStore((state) => state.language);
  const output = useStore((state) => state.currentOutput);
  const setOutput = useStore((state) => state.setCurrentOutput);
  const isRunning = useStore((state) => state.isRunning);

  const runningRef = useRef(isRunning);
  const inputRef = useContext(InputContext);

  const socket = useContext(SocketContext);

  useEffect(() => {
    runningRef.current = isRunning;
  }, [isRunning]);

  return (
    <div className="h-full w-full flex flex-col gap-2 p-2">
      <div className="flex items-center justify-between pe-2">
        <span className="block text-white font-semibold">Output: </span>
        <button
          className="btn btn-outline btn-warning btn-sm"
          onClick={() => {
            setOutput("");
            inputRef.current = "";
          }}
        >
          Clear
        </button>
      </div>
      <Editor
        language="plaintext"
        theme={theme}
        value={output}
        onChange={(value) => {
          setOutput(value as string);
        }}
        options={{
          readOnly: !isRunning,
          minimap: { enabled: false },
          wordWrap: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          readOnlyMessage: { value: "Run code to take input..." },
          ...fontConfig,
        }}
        onMount={(editor, monaco) => {
          // block cursor movement with mouse
          editor.onMouseDown(() => {
            const model = editor.getModel();
            const lastLine = model?.getLineCount() ?? 0;
            const lastColumn = model?.getLineMaxColumn(lastLine) ?? 0;
            editor.setPosition({ lineNumber: lastLine, column: lastColumn });
          });

          editor.onKeyDown((event) => {
            const stopDefault = () => {
              event.stopPropagation();
              event.preventDefault();
            };
            //block cursor movement with keyboard
            if (
              event.keyCode === monaco.KeyCode.UpArrow ||
              event.keyCode === monaco.KeyCode.DownArrow ||
              event.keyCode === monaco.KeyCode.LeftArrow ||
              event.keyCode === monaco.KeyCode.RightArrow
            ) {
              stopDefault();
            }

            // handle ctrl + backspace
            if (event.keyCode === monaco.KeyCode.Backspace && event.ctrlKey) {
              if (inputRef.current) {
                inputRef.current = inputRef.current
                  .trimEnd()
                  .replace(/\w+$/, "");
                return;
              }
              stopDefault();
            }
            // handle backspace
            if (event.keyCode === monaco.KeyCode.Backspace) {
              if (inputRef.current) {
                inputRef.current = inputRef.current.slice(0, -1);
                return;
              }
              stopDefault();
            }

            //register input
            const key = event.browserEvent.key;
            if (
              /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]$/.test(key) &&
              runningRef.current
            ) {
              inputRef.current += key;
              return;
            }

            // handle input sumbission
            if (event.keyCode === monaco.KeyCode.Enter) {
              socket?.sendJsonMessage({
                command: "input",
                input: inputRef.current + "\n",
                language: activeLanguage,
              });
              inputRef.current = "";
            }
          });
        }}
      />
    </div>
  );
}

export default Output;
