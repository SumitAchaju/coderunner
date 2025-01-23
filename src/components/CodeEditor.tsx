import { useEffect, useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Code from "./Code";
import Output from "./Output";
import { useThrottledCallback } from "use-debounce";

type Props = {};

function CodeEditor({}: Props) {
  const [isVertical, setIsVertical] = useState(false);

  const useThrottleHandleResize = useThrottledCallback(() => {
    setIsVertical(window.innerWidth < 768);
  }, 500);

  useEffect(() => {
    useThrottleHandleResize();
    window.addEventListener("resize", useThrottleHandleResize);

    return () => {
      window.removeEventListener("resize", useThrottleHandleResize);
    };
  }, []);

  return (
    <PanelGroup direction={isVertical ? "vertical" : "horizontal"}>
      <Panel minSize={20}>
        <Code />
      </Panel>
      <PanelResizeHandle
        className={(isVertical ? "w-full h-2" : "w-2") + " bg-base-300"}
      />
      <Panel minSize={20}>
        <Output />
      </Panel>
    </PanelGroup>
  );
}

export default CodeEditor;
