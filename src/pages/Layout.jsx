import { Outlet, useNavigation, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Fragment, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

const Layout = () => {
  const { usuario, setUsuario, setDominio, setToken } = useUserContext();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const params = useParams();

  console.log(params);

  const arraysParams = params.id.split("|");

  // hacerlos memoizados para evitar re-render

  const dominio = useMemo(() => {
    return arraysParams[0];
  }, [arraysParams]);

  const token = useMemo(() => {
    return arraysParams[1];
  }, [arraysParams]);
  console.log(dominio);
  console.log(token);

  useEffect(() => {
    setDominio(dominio);
    setToken(token);
  }, [dominio, token]);

  //TODO:
  //leer parametros
  // parsear el id y el token (id|token)
  // futuro: leer google sheets y obtener info de la api
  // o un archivo csv => lib para csv
  // pasar las apis al usercontext
  // hacer aca el request a la api enviando el token

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
          //navigate("/Dashboard");
        } catch (error) {
          navigate("/NotFound");
        }
      } else {
        navigate(`/${params.id}/`);
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
