import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import RedirectRoute from "./pages/RedirectRoute";
import { SocketProvider } from "./context/socketContext";
import { InputProvider } from "./context/inputContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/*" element={<RedirectRoute />} />
    </>
  )
);

function App() {
  return (
    <InputProvider>
      <SocketProvider>
        <RouterProvider router={router} />
      </SocketProvider>
    </InputProvider>
  );
}

export default App;
