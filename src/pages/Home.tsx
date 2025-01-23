import CodeEditor from "../components/CodeEditor";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

type Props = {};

const Home = ({}: Props) => {
  return (
    <div className="h-screen flex flex-col text-lg">
      <Header />
      <div className="flex grow">
        <Sidebar />
        <CodeEditor />
      </div>
    </div>
  );
};

export default Home;
