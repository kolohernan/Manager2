import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import LayoutPrivate from "../pages/LayoutPrivate";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
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
        path: "/Articulos",
        element: <Articulos />,
      },
      /*
      {
        path: "/Dashboard",
        element: <LayoutPrivate />,
        errorElement: <NotFound />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },

          {
            path: "/Dashboard/Clientes",
            element: <Clientes />,
          },
        ],
      },
      */
    ],
  },
]);
