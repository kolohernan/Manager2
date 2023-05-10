import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Articulos from "../pages/Articulos";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/articulos",
    element: <Articulos />,
  },
]);
