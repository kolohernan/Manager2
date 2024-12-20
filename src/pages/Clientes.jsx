import {
  parseColumnTitles,
  consultaSesion,
  funcionLogout,
} from "../funciones/Utilidades";
import NavsideClientes from "../Componentes/NavSide_clientes";
import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { axiosInstance } from "../funciones/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { logEvent } from "../funciones/axios-post-log2";

function Clientes() {
  //Seteo el titulo de la pagina
  useEffect(() => {
    document.title = "Busqueda de Clientes";
  }, []);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  //traigo la cadena del Usercontext
  const { usuario, urlDominio, key } = useUserContext();

  // guardar en estado el elemento seleccionado después de hacer click en Ver Mas
  const [datosnav, SetDatosnav] = useState(null);
  // guardar en estado para ver si muestro o no los resultados
  const [visible, SetVisible] = useState(null);
  // estado para guardar el resultado de la búsqueda
  const [search, setSearch] = useState("");
  //estado para mostrar si hay un error
  const [error, setError] = useState("");
  const [ruta, setRuta] = useState("");
  // ejemplo de cadena que viene por el usuario
  //ACA MANEJO LO QUE HACE EL BOTON DE BUSQUEDA

  //estado para guardar el estado de sesion
  const [estado, setEstado] = useState("");
  const obtenerEstado = async () => {
    const estadoSesion = await consultaSesion(urlDominio, key);
    setEstado(estadoSesion);
  };
  useEffect(() => {
    obtenerEstado();
  }, []);

  useEffect(() => {
    if (estado === "N") {
      navigate(`/${params.id}/`);
      funcionLogout();
    }
  }, [estado]);

  ////////////////////////////////////////////////////////////////////////////////////////

  //const claves = Object.keys(data[0]);
  //console.log("RESULTADO DE las claves", claves);

  //console.log("titulos parseados", titulosColumnas);

  ////////////////////////////////////////////////////////////////////////////////////////

  const handleSubmit = (e) => {
    e.preventDefault();
    buscarCliente();
    obtenerEstado();
    if (estado === "N") {
      navigate(`/${params.id}/`);
      funcionLogout();
    }
  };

  useEffect(() => {
    // Reemplazar espacios en blanco por '%'
    const formattedSearch = search.replace(/ /g, "%25");
    if (usuario?.Entidad_Tipo === "CLI") {
      setRuta(
        `${urlDominio}Api_Clientes/Consulta?key=${key}&campo=IDS&valor=${usuario?.Entidad_Codigos}&error_sin_registros=false`
      );
      //console.log(ruta);
      buscarCliente();
    } else if (usuario?.Entidad_Tipo === "VND") {
      setRuta(
        `${urlDominio}Api_Clientes/Consulta?key=${key}&campo=OTRO&valor=%25${formattedSearch}%25&vendcampo=IDS&vendvalor=${usuario?.Entidad_Codigos}&error_sin_registros=false`
      );
      //console.log(ruta);
    } else {
      setRuta(
        `${urlDominio}Api_Clientes/Consulta?key=${key}&campo=OTRO&valor=%25${formattedSearch}%25&error_sin_registros=false`
      );
    }
  }, [
    key,
    ruta,
    search,
    urlDominio,
    usuario.Entidad_Codigos,
    usuario.Entidad_Tipo,
  ]);
  //react q
  // useQuery // buscar info
  // useMutation // para hacer llamadas programáticas, cuando el usuario es el que le pega al servidor (un boton ponele)
  //console.log(ruta);
  const {
    mutate: buscarCliente,
    isPending,
    isError,
    data: searchResult,
  } = useMutation({
    mutationFn: async () => {
      // Verificar si 'search' es nulo o está vacío
      if (
        (!search || search.trim() === "") &&
        usuario?.Entidad_Tipo !== "CLI"
      ) {
        throw new Error("El campo de búsqueda no puede estar vacío.");
      }
      return axiosInstance.get(ruta);
    },
    onError: (e) => {
      // if (response.status >= 400) {
      //   throw new Error("Server responds with error!");
      // }
      if (e === "Deslogueado") {
        navigate(`/${params.id}/`);
        return;
      }
      /*if (e?.Error_Code) setError(mapaLabelError[e.Error_Code]);*/
      setError(e.message);
      // siempre está bueno loggear el error para debuggear
      //console.error(e);
      console.log(e.message);
    },
    onSuccess: () => {
      //console.log("aca veo el resultado del searchresulto", searchResult?.data);
      SetVisible(true);
    },
  });

  let Cli_Campos_Grid;
  let Cli_Campos_Det;
  let Grid;
  let Det;
  if (usuario.Cli_Campos_Grid === null || usuario.Cli_Campos_Grid === "") {
    Cli_Campos_Grid = "<Codigo><Razon_Social>";
    Grid = "S";
  } else {
    Cli_Campos_Grid = usuario.Cli_Campos_Grid;
  }

  if (usuario.Cli_Campos_Det === null || usuario.Cli_Campos_Det === "") {
    Cli_Campos_Det = Cli_Campos_Grid;
    Det = "S";
  } else {
    Cli_Campos_Det = usuario.Cli_Campos_Det;
  }

  //separar la cadena con la funcion declarada
  const titulosColumnas = parseColumnTitles(Cli_Campos_Grid);
  ////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (
      searchResult &&
      typeof searchResult === "object" &&
      searchResult.data.length !== 0
    ) {
      const logData = {
        key: key,
        urlDominio: urlDominio,
        Session_Id: usuario?.Session_Id,
        Cod_Usuario: usuario?.Cod_Usuario,
        pagina: "busqueda clientes",
        accion: "Busqueda con resultados",
        valor: search,
        agent: "CLOUD",
      };
      logEvent(logData);

      //console.log("valor de searchresulto", searchResult);
      const claves = Object.keys(searchResult?.data[0]);
      //console.log("RESULTADO EN DONDE TENGO QUE BUSCAR LAS CLAVES", claves);

      titulosColumnas.forEach((titulo) => {
        const valor = titulo[0];
        if (!claves.includes(valor)) {
          console.log(
            `El valor ${valor} no se encuentra en la lista de claves`
          );
          Grid = "S";
        } else {
          //console.log(`todos los valores se encontraron`);
        }
      });
    }
  }, [searchResult]);

  const titulosColumnasDefecto = [
    ["Codigo", "Codigo"],
    ["Razon_Social", "Razon Social"],
  ];
  ////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      {/* Le paso a la Sidebar los datos del api de Clientes y de las columnas */}
      {
        <NavsideClientes
          datosnav={datosnav}
          cadenaCliente2={Cli_Campos_Det}
          Det={Det}
        />
      }

      <header id="header-busqueda" className="text-center fixed-top">
        <div className="container">
          <h2 className="py-5">Busqueda de Clientes</h2>
          <div className="input-group mb-3">
            <form className="input-group" onSubmit={handleSubmit}>
              <input
                disabled={usuario.Entidad_Tipo === "CLI"}
                type="text"
                className="form-control barra-Manager"
                placeholder="Escribe para buscar"
                aria-label="Escribe para buscar"
                aria-describedby="button-busqueda-clientes"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/*valor + onchange para controlarlo  */}
              <button
                className="btn btn-manager"
                type="submit"
                id="button-busqueda-clientes"
                disabled={usuario.Entidad_Tipo === "CLI"}
              >
                Buscar
              </button>
            </form>
          </div>
        </div>
      </header>
      {isPending ? (
        <div className="Resultado-api d-flex text-center">
          <h5 className="mx-5">Cargando</h5>
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : isError ? (
        <div className="Resultado-api d-flex text-center">
          <h5 className="mx-5">{error}</h5>
        </div>
      ) : searchResult?.data?.length == 0 ? (
        <>
          <div className="Resultado-api d-flex text-center">
            <h5 className="mx-5">No se encontro ningun resultado</h5>
          </div>
        </>
      ) : (
        <div className="Resultado-api">
          {visible ? (
            <div className="Contenido">
              {Grid === "S" ? (
                <div className="alert alert-warning" role="alert">
                  Esta vista es por Defecto
                </div>
              ) : null}
              <table className="table table-mobile-responsive table-mobile-sided mt-5">
                <thead>
                  <tr>
                    {titulosColumnas.map((item) => {
                      return (
                        <th scope="col" key={item[0]}>
                          {item[1]}
                        </th>
                      );
                    })}
                    <th scope="col">Ver mas</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Recorremos el array con map*/}
                  {searchResult?.data?.map((Clientes) => {
                    //->
                    const clientesConKeysEnMinusculas = Object.fromEntries(
                      Object.entries(Clientes).map(([k, v]) => {
                        return [k.toLowerCase(), v];
                      })
                    );
                    // Object.entries =>
                    // { Kolo:1,Damian:2} => [["Kolo",1],["Damian",2]]
                    // map => ([k,v])=> [k.toLowerCase,v]
                    // [["kolo",1],["damian",2]]
                    // Object.fromEntries (^^^) => { kolo:1,damian:2}
                    return (
                      <tr key={clientesConKeysEnMinusculas.codigo}>
                        {titulosColumnas.map((item) => {
                          return (
                            <td data-content={item[1]} key={item[0]}>
                              {clientesConKeysEnMinusculas[
                                item[0].toLowerCase()
                              ].toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                              })}
                            </td>
                          );
                        })}
                        <td>
                          {/* A cada botón hay que darle un manejador de evento para que guarde en estado el elemento (Clientes en este caso del map ^^^^ ) */}
                          <button
                            className="btn btn-manager"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasDarkNavbar"
                            aria-controls="offcanvasDarkNavbar"
                            onClick={() => {
                              const logData = {
                                key: key,
                                urlDominio: urlDominio,
                                Session_Id: usuario?.Session_Id,
                                Cod_Usuario: usuario?.Cod_Usuario,
                                pagina: "busqueda clientes",
                                accion: "Ver más",
                                valor: `${Clientes.Razon_Social}`,
                                agent: "CLOUD",
                              };
                              logEvent(logData);
                              SetDatosnav(Clientes);
                              obtenerEstado();
                              if (estado === "N") {
                                navigate(`/${params.id}/`);

                                funcionLogout();
                              }
                            }}
                          >
                            Ver mas
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}

export default Clientes;
