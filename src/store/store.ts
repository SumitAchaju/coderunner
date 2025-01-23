import { create } from "zustand";
import { CODE_SNIPPETS } from "../constants/language";

export type SupportedLanguages =
  | "Python"
  | "Javascript"
  | "Html"
  | "Java"
  | "Cpp"
  | "Rust"
  | "Php";

interface storeState {
  language: SupportedLanguages;
  theme: "light" | "vs-dark";
  currentCode: string;
  currentOutput: string;
  isRunning: boolean;
  setLanguage: (lang: SupportedLanguages) => void;
  setTheme: (theme: "light" | "vs-dark") => void;
  setCurrentCode: (code: string) => void;
  resetCode: () => void;
  updateOutput: (output: string) => void;
  setCurrentOutput: (output: string) => void;
  resetOutput: () => void;
  setIsRunning: (isRunning: boolean) => void;
}

export const useStore = create<storeState>()((set) => ({
  language: "Python",
  theme: "vs-dark",
  currentCode: CODE_SNIPPETS["python"],
  currentOutput: "",
  isRunning: false,
  setLanguage: (lang) => set(() => ({ language: lang })),
  setTheme: (theme) => set(() => ({ theme })),
  setCurrentCode: (code) => set(() => ({ currentCode: code })),
  resetCode: () => set(() => ({ currentCode: "" })),
  updateOutput: (output) =>
    set((state) => ({ currentOutput: state.currentOutput + output })),
  setCurrentOutput: (output) => set(() => ({ currentOutput: output })),
  resetOutput: () => set(() => ({ currentOutput: "" })),
  setIsRunning: (isRunning) => set(() => ({ isRunning })),
}));
