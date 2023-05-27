import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import Navbar from "../Componentes/Navbar";
import Footer from "../Componentes/Footer";
import { useUserContext } from "../context/UserContext";
import { Fragment, useEffect } from "react";

const LayoutPrivate = () => {
  const { usuario, setUsuario } = useUserContext();
  const navigation = useNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuario) {
      navigate("/Home");
    }
  }, []);

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
export default LayoutPrivate;
