import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import Navbar from "../Componentes/Navbar";
import Footer from "../Componentes/Footer";
import { useUserContext } from "../context/UserContext";
import { Fragment, useEffect } from "react";

const LayoutPrivate = () => {
  const { usuario, setUsuario } = useUserContext();
  const navigation = useNavigation();
  const navigate = useNavigate();

  //si el usuario es falso, lo vuelvo a la pagina de inicio
  useEffect(() => {
    if (!usuario) {
      navigate("/NotFound");
    }
  }, []);
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
