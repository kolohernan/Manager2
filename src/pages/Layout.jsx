import {
  Outlet,
  useNavigation,
  useNavigate,
  useLocation,
  useParams,
  Navigate,
} from "react-router-dom";
import { consultaSesion } from "../funciones/Utilidades";
import { useUserContext } from "../context/UserContext";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useLeerCSV } from "../funciones/useLeerCSV";
import { useMutation, useQuery } from "@tanstack/react-query";
import Home from "../pages/Home";

const Layout = () => {
  //RECUPERO LOS DATOS DEL USERCONTEX Y DEMAS LIBRERIAS
  const { usuario, setUsuario, setDominio, setToken, urlDominio, key, Css } =
    useUserContext();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const params = useParams();

  // ESTADO PARA GUARDAR LOS DATOS DEL TOKEN
  const [datosToken, setDatosToken] = useState([]);
  // PARSEO EL ID Y EL TOKEN (id|token)
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
  }, [setDominio, setToken, token]);

  // LEO LOS DATOS DEL ARCHIVO CSV
  useLeerCSV(dominio);

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
        console.log(e, "lala");
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
          if (pathname === "/" + dominio + "/") {
            navigate(`${pathname}Dashboard`);
          } else if (pathname === "/" + dominio) {
            navigate(`${pathname}/Dashboard`);
          } else {
            navigate(`${pathname}`);
          }
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

  //VERIFICO SI LA SESIONID DE LA CACHE, ESTA ACTIVO EN LA API
  const { data: estado } = useQuery({
    queryKey: ["estado", urlDominio, key],
    queryFn: async () => {
      return consultaSesion(urlDominio, key);
    },
    // enabled:true
  });
  if (!estado) {
    return <p></p>;
  }

  return (
    <Fragment>
      {/*navigation.state === "loading" && (
        <div className="alert alert-info my-5">Cargando...</div>
      )*/}
      {Css ? (
        <Outlet />
      ) : (
        <>
          <div className="cotainer">
            <div className="row">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "95vh" }}
              >
                <div className="page-loader flex-column text-center">
                  <span
                    className="spinner-border spinner-border-xl text-warning me-4"
                    role="status"
                  ></span>
                  <span className="text-muted fs-1 fw-semibold mt-5">
                    Cargando...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/*Css ? <Outlet /> : null*/}
    </Fragment>
  );
};
export default Layout;
