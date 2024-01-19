import {
  Outlet,
  useNavigation,
  useNavigate,
  useLocation,
  useParams,
} from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useLeerCSV } from "../funciones/useLeerCSV";

const Layout = () => {
  const { usuario, setUsuario, setDominio, setToken, urlDominio, key, Css } =
    useUserContext();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const params = useParams();

  // estado para guardar el resultado de la búsqueda
  const [datosToken, setDatosToken] = useState([]);

  // parsear el id y el token (id|token)
  const arraysParams = params.id.split("||");

  // hacerlos memoizados para evitar re-render
  const dominio = useMemo(() => {
    return arraysParams[0];
  }, [arraysParams]);

  const token = useMemo(() => {
    return arraysParams[1];
  }, [arraysParams]);

  useEffect(() => {
    setDominio(dominio);
    setToken(token);
  }, [dominio, setDominio, setToken, token]);

  // Leo los datos del CSV
  useLeerCSV(dominio);

  //seteo el estilo - despues ver
  useEffect(() => {
    if (Css) {
      import(Css);
    }
  }, [Css]);

  //Obtengo los datos del tipo de usuario con el token
  useEffect(() => {
    if (!token || !urlDominio) {
      //Si no hay o token o da error
      console.log("token incorrecto");
      //shortcut -- salir del useEffect y no hacer nada
      return;
    }
    //Si hay token
    // hacer aca el request a la api enviando el token
    console.log("token correcto");

    const consultaToken = async (e) => {
      try {
        const response = await fetch(
          `${urlDominio}Api_Usuarios/ConsultaToken?key=${key}&token=${token}`
        );
        //console.log(response);
        const json = await response.json();
        //console.log("kolo", json);
        setDatosToken(json);
        if (response.ok) {
          console.log("llego bien la consulta de token");
        } else {
          console.log("NO llego bien la consulta de token");
        }
        //console.log(searchResult);
      } catch (e) {
        console.log(e)("lala");
      } finally {
        ("lalal");
      }
    };
    consultaToken();
  }, [key, token, urlDominio]);

  //muestro los datos que obtuve de token
  useEffect(() => {
    const entidadUser = datosToken?.[0]?.Entidad_Tipo;
    console.log(entidadUser);
    //if (!entidadUser)
  }, [datosToken]);

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    // Chequeo si el usuario esta en momemoria (contexto)
    if (!usuario) {
      // le asigno a crede el valor del localstorage en texto
      const crede = localStorage.getItem("credenciales");
      // SI LAS CREDENCIALES ESTAN EN EL LOCALSTORAGE
      if (crede) {
        // try catch para que no crashee la app si el parse falla. (JSON.parse puede fallar si la string no es parseable a JSON)
        try {
          //hago el parse
          const UsuarioLocal = JSON.parse(crede);
          // igualo el Usuario con User
          setUsuario(UsuarioLocal);
          // SI LAS CREDENCIALES ESTAN BIEN, LO REDIRIJO A LA PAGINA QUE QUIERE INGRESAR
          navigate(`${pathname}/`);
        } catch (error) {
          // SI LAS CREDENCIALES ESTAN MAL, LO REDIRIJO A LA PAGINA QUE QUIERE INGRESAR
          navigate(`/${params.id}/NotFound`);
        }
      } else {
        // SI LAS CREDENCIALES NO ESTAN EN EL LOCALSTORAGE, LOS MANDO AL HOME PARA QUE SE PUEDAN LOGUEAR
        navigate(`/${params.id}/`);
      }
    }
  }, [navigate, params.id, pathname, setUsuario, usuario]);

  return (
    <Fragment>
      {/*<LeerCSV dominio={dominio} />*/}
      {navigation.state === "loading" && (
        <div className="alert alert-info my-5">Cargando...</div>
      )}
      <Outlet />
    </Fragment>
  );
};
export default Layout;
