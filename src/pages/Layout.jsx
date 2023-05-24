import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../Componentes/Navbar";
import Footer from "../Componentes/Footer";
import { Fragment } from "react";

const Layout = () => {
  const navigation = useNavigation();

  return (
    <Fragment>
      <Navbar />
      <div id="container-principal" className="container">
        {navigation.state === "loading" && (
          <div className="alert alert-info my-5">Cargando...</div>
        )}
        <Outlet />
      </div>
      <Footer />
    </Fragment>
  );
};
export default Layout;
