import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Articulos from "../pages/Articulos";
import Clientes from "../pages/Clientes";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/articulos",
        element: <Articulos />,
      },
      {
        path: "/clientes",
        element: <Clientes />,
      },
    ],
  },
]);
