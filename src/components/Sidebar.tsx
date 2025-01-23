import { useContext } from "react";
import { CODE_SNIPPETS, sideBarLanguage } from "../constants/language";
import { SupportedLanguages, useStore } from "../store/store";
import InputContext from "../context/inputContext";
import SocketContext from "../context/socketContext";

type Props = {};

function Sidebar({}: Props) {
  return (
    <div className="w-[60px] flex flex-col gap-2 p-4 items-center">
      {sideBarLanguage.map((language) => (
        <SidebarIcon
          key={language.name}
          Icon={language.Icon}
          language={language.name}
        />
      ))}
    </div>
  );
}

export default Sidebar;

type SidebarIconProps = {
  Icon: React.ComponentType;
  language: SupportedLanguages;
};

export const SidebarIcon = ({ Icon, language }: SidebarIconProps) => {
  const setCurrentCode = useStore((state) => state.setCurrentCode);
  const resetOutput = useStore((state) => state.resetOutput);
  const setIsRunning = useStore((state) => state.setIsRunning);
  const activeLanguage = useStore((state) => state.language);
  const setActiveLanguage = useStore((state) => state.setLanguage);
  const isRunning = useStore((state) => state.isRunning);

  const socket = useContext(SocketContext);

  const inputRef = useContext(InputContext);
  return (
    <div className="tooltip tooltip-right" data-tip={language}>
      <button
        className={`block w-10 h-10 p-2 rounded-xl ${
          language === activeLanguage ? "bg-[#374151]" : "bg-base-100"
        }`}
        onClick={() => {
          setActiveLanguage(language);
          setCurrentCode(
            CODE_SNIPPETS[
              language.toLocaleLowerCase() as keyof typeof CODE_SNIPPETS
            ]
          );
          resetOutput();
          setIsRunning(false);
          inputRef.current = "";
          if (isRunning) {
            socket?.sendJsonMessage({ command: "stop" });
          }
        }}
      >
        <Icon />
      </button>
    </div>
  );
};
