import { Outlet, useNavigation, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Fragment, useEffect } from "react";

const Layout = () => {
  const { usuario, setUsuario } = useUserContext();
  const navigation = useNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    // Chequeo si el usuario esta en momemoria (contexto)
    if (!usuario) {
      // le asigno a crede el valor del localstorage en texto
      const crede = localStorage.getItem("credenciales");
      if (crede) {
        // try catch para que no crashee la app si el parse falla. (JSON.parse puede fallar si la string no es parseable a JSON)
        try {
          //hago el parse
          const UsuarioLocal = JSON.parse(crede);
          // igualo el Usuario con User
          setUsuario(UsuarioLocal);
          // Lo mando a la app
          navigate("/Dashboard");
        } catch (error) {
          navigate("/NotFound");
        }
      } else {
        navigate("/NotFound");
      }
    }
  }, []);

  return (
    <Fragment>
      {navigation.state === "loading" && (
        <div className="alert alert-info my-5">Cargando...</div>
      )}
      <Outlet />
    </Fragment>
  );
};
export default Layout;
