import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import LayoutPrivate from "../pages/LayoutPrivate";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Articulos from "../pages/Articulos";
import Clientes from "../pages/Clientes";
import Pedidos from "../pages/Pedidos";
import NotFound from "../pages/NotFound";
import CuentaCorriente from "../pages/CuentaCorriente";
import useUserContext from "../context/UserContext";

export const router = createBrowserRouter([
  {
    path: "/:id",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <NotFound />,
      },
      {
        path: "Dashboard",
        element: <LayoutPrivate />,
        errorElement: <NotFound />,
        children: [
          {
            index: true,
            element: <Dashboard />,
            errorElement: <NotFound />,
          },

          {
            path: "Clientes",
            element: <Clientes />,
            errorElement: <NotFound />,
          },
          {
            path: "Articulos",
            element: <Articulos />,
            errorElement: <NotFound />,
          },
          /*
          {
            path: "Pedidos",
            element: <Pedidos />,
          },
          */
          {
            path: "Clientes/CuentaCorriente/:cuentaCorriente",
            element: <CuentaCorriente />,
            errorElement: <NotFound />,
          },
        ],
      },
    ],
  },
]);
