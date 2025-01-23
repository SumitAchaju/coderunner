import { Link } from "react-router-dom";
import { CODE_SNIPPETS, langList } from "../constants/language";
import { SupportedLanguages, useStore } from "../store/store";
import { useContext } from "react";
import SocketContext from "../context/socketContext";
import InputContext from "../context/inputContext";

type Props = {};

function Header({}: Props) {
  const activeLanguage = useStore((state) => state.language);
  const setActiveLanguage = useStore((state) => state.setLanguage);
  const theme = useStore((state) => state.theme);
  const setTheme = useStore((state) => state.setTheme);

  const setCurrentCode = useStore((state) => state.setCurrentCode);
  const resetOutput = useStore((state) => state.resetOutput);
  const setIsRunning = useStore((state) => state.setIsRunning);
  const isRunning = useStore((state) => state.isRunning);

  const socket = useContext(SocketContext);

  const inputRef = useContext(InputContext);
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1 items-center gap-3">
        <div className="rounded-full shrink-0 md:w-10 md:h-10 w-8 h-8">
          <img
            className="w-full h-full object-cover"
            src="https://compiler.skillshikshya.com/assets/runnerlogo-BTTcLtOZ.png"
            alt="brand logo"
          />
        </div>
        <Link to={"/"} className="md:text-2xl font-bold text-xl">
          Sumit Achaju
        </Link>
      </div>
      <div className="flex-none gap-2">
        <select
          className="select select-primary w-full max-w-xs md:max-w-md select-sm sm:select-md"
          value={activeLanguage}
          onChange={(e) => {
            setActiveLanguage(e.target.value as SupportedLanguages);
            setCurrentCode(
              CODE_SNIPPETS[
                e.target.value.toLocaleLowerCase() as keyof typeof CODE_SNIPPETS
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
          {langList.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn m-1 btn-sm sm:btn-md btn-info"
          >
            Theme
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-300 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li
              className={theme === "vs-dark" ? "bg-gray-700" : ""}
              onClick={() => setTheme("vs-dark")}
            >
              <span>Dark</span>
            </li>
            <li
              className={theme === "light" ? "bg-gray-700" : ""}
              onClick={() => setTheme("light")}
            >
              <span>Light</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
