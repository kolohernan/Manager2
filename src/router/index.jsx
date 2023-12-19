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

export const router = createBrowserRouter([
  {
    path: "/:id",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "Dashboard",
        element: <LayoutPrivate />,
        errorElement: <NotFound />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "Clientes",
            element: <Clientes />,
          },
          {
            path: "Articulos",
            element: <Articulos />,
          },
          {
            path: "Pedidos",
            element: <Pedidos />,
          },
          {
            path: "Clientes/CuentaCorriente/:cuentaCorriente",
            element: <CuentaCorriente />,
          },
        ],
      },
    ],
  },
]);
