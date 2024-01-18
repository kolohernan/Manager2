import { Outlet, useNavigation, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useLeerCSV } from "../funciones/useLeerCSV";

const Layout = () => {
  const { usuario, setUsuario, setDominio, setToken, urlDominio } =
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
  }, [dominio, token]);

  //seteo el estilo - despues ver
  useEffect(() => {
    if (dominio === "MSM") {
      import(`../styles/manager.css`);
    } else if (dominio === "CTT") {
      import(`../styles/mecan.css`);
    } else if (dominio === "FYE") {
      import(`../styles/frenos.css`);
    }
  }, []);

  //TODO:

  // futuro: leer google sheets y obtener info de la api
  // pasar las apis al usercontext
  useLeerCSV(dominio);

  useEffect(() => {
    // asi no se ejecuta la request:
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
          `${urlDominio}Api_Usuarios/ConsultaToken?key=ChatBotManager&token=${token}`
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
        ("lala");
      } finally {
        ("lalal");
      }
    };
    consultaToken();
  }, [token, urlDominio]);

  console.log(datosToken?.[0]?.Entidad_Tipo);

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
          navigate(`/${params.id}/NotFound`);
        }
      } else {
        navigate(`/${params.id}/`);
      }
    }
  }, []);

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
