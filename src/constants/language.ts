import {
  CppIcon,
  HtmlIcon,
  JavaIcon,
  JsIcon,
  PhpIcon,
  PyIcon,
  RustIcon,
} from "../components/Icons";
import { SupportedLanguages } from "../store/store";

export const langList: SupportedLanguages[] = [
  "Python",
  "Javascript",
  "Html",
  "Java",
  "Cpp",
  "Rust",
  "Php",
];

export const sideBarLanguage: {
  Icon: React.ComponentType;
  name: SupportedLanguages;
}[] = [
  {
    Icon: PyIcon,
    name: "Python",
  },
  {
    Icon: HtmlIcon,
    name: "Html",
  },
  {
    Icon: JsIcon,
    name: "Javascript",
  },
  {
    Icon: JavaIcon,
    name: "Java",
  },
  {
    Icon: CppIcon,
    name: "Cpp",
  },
  {
    Icon: RustIcon,
    name: "Rust",
  },
  {
    Icon: PhpIcon,
    name: "Php",
  },
];

export const CODE_SNIPPETS = {
  javascript: `function greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Sumit Achaju");\n`,
  python: `def greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Sumit Achaju")\n`,
  java: `public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Sumit Achaju");\n\t}\n}\n`,
  php: "<?php\n\n$name = 'Sumit Achaju';\necho $name;\n",
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n\tcout << "Sumit Achaju";\n\treturn 0;\n}\n`,
  rust: `fn main() {\n\tprintln!("Sumit Achaju");\n}\n`,
  html: `<!DOCTYPE html>\n<html>\n<body>\n\t<h1>Sumit Achaju</h1>\n</body>\n</html>\n`,
};
