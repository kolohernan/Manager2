import { Outlet } from "react-router-dom";
import Navbar from "../Componentes/Navbar";
import Footer from "../Componentes/Footer";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
export default Layout;
