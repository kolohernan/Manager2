import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../Componentes/Navbar";
import Footer from "../Componentes/Footer";
import { Fragment } from "react";

const LayoutPrivate = () => {
  const navigation = useNavigation();
  return (
    <Fragment>
      <Navbar />
      <div id="container-dashboard">
        <div className="container">
          {navigation.state === "loading" && (
            <div className="alert alert-info my-5">Cargando...</div>
          )}
          <Outlet />
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};
export default LayoutPrivate;
