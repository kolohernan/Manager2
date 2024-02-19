import { parseColumnTitles } from "../funciones/Utilidades";
import NavsideClientes from "../Componentes/NavSide_clientes";
import { useState, useEffect, Fragment } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { axiosInstance } from "../funciones/axios-instance";
import { useMutation } from "@tanstack/react-query";

function Clientes() {
  //Seteo el titulo de la pagina
  useEffect(() => {
    document.title = "Busqueda de Clientes";
  }, []);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  //traigo la cadena del Usercontext
  const { usuario, setclientesCC } = useUserContext();

  // guardar en estado el elemento seleccionado después de hacer click en Ver Mas
  const [datosnav, SetDatosnav] = useState(null);

  const [search, setSearch] = useState("");
  // estado para guardar el resultado de la búsqueda
  const [searchResult, setSearchResult] = useState([]);
  //estado para mostrar si está cargando
  const [isLoading, setIsLoading] = useState(false);
  //estado para mostrar si hay un error
  const [error, setError] = useState("");
  // ejemplo de cadena que viene por el usuario

  const mapaLabelError = {
    "-1": "Hubo una excepcion",
    "-11": "Datos no encontrados",
    //....
  };

  //ACA MANEJO LO QUE HACE EL BOTON DE BUSQUEDA
  const handleSubmit = async (e) => {
    e.preventDefault();
    // probamos hacer algo.. si falla nos vamos al catch
    try {
      // declaramos que se está cargando y limpiamos el error si hay alguno
      setIsLoading(true);
      setError("");
      // hacemos el fetch
      const response = await fetch(
        `http://chiarottotal.ddns.net:3381/v300/api/Api_Clientes/Consulta?key=ChatBotManager&campo=OTRO&valor=%${search}%`
      );
      // importante llamar a `.json` para obtener la respuesta
      const json = await response.json();
      // guardamos lo que sea relevante de la request en el estado q declaramos para los resultados.
      // en este caso la respuesta tiene un `items` que tiene la lista de usuarios de github que dio como resultado
      setSearchResult(json);
      // mirá la consola para ver qué forma tiene (esto desp borralo)
    } catch (e) {
      //si hubo un error esto viene acá... entonces agregamos un mensaje para notificar al usuario de que algo salió mal (esto lo vas a tener que renderizar abajo vos después)
      if (e?.Error_Code) setError(mapaLabelError[e.Error_Code]);
      // siempre está bueno loggear el error para debuggear
      console.error(e);
      //finally es para hacer cosas sin importar si hubo error o no. Ocurre siempre
    } finally {
      // no importa lo que pase, el "cargando" debería desactivarse cuando termina todo esto
      setIsLoading(false);
    }
  };
  let ClientesUsuario1 = usuario.cadenaCliente;

  //separar la cadena con la funcion declarada
  const titulosColumnas = parseColumnTitles(ClientesUsuario1);
  //tarda en cargar

  return (
    <>
      {/* Le paso a la Sidebar los datos del api de articulos y de las columnas */}
      <NavsideClientes
        datosnav={datosnav}
        cadenaCliente2={usuario.cadenaCliente2}
      />

      <header id="header-busqueda" className="text-center fixed-top">
        <div className="container">
          <h2 className="py-5">Busqueda de Clientes</h2>
          <div className="input-group mb-3">
            <form className="input-group" onSubmit={handleSubmit}>
              <input
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
              >
                Buscar
              </button>
            </form>
          </div>
        </div>
      </header>
      {isLoading ? (
        <div className="Resultado-api d-flex text-center">
          <h5 className="mx-5">Cargando</h5>
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : error ? (
        <div className="Resultado-api d-flex text-center">
          <h5 className="mx-5">Error</h5>
        </div>
      ) : (
        <div className="Resultado-api">
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
              {searchResult?.map((Articulos) => {
                //->
                const articulosConKeysEnMinusculas = Object.fromEntries(
                  Object.entries(Articulos).map(([k, v]) => {
                    return [k.toLowerCase(), v];
                  })
                );
                // Object.entries =>
                // { Kolo:1,Damian:2} => [["Kolo",1],["Damian",2]]
                // map => ([k,v])=> [k.toLowerCase,v]
                // [["kolo",1],["damian",2]]
                // Object.fromEntries (^^^) => { kolo:1,damian:2}
                return (
                  <tr key={articulosConKeysEnMinusculas.codigo}>
                    {titulosColumnas.map((item) => {
                      return (
                        <td data-content={item[1]} key={item[0]}>
                          {articulosConKeysEnMinusculas[item[0].toLowerCase()]}
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
                          SetDatosnav(Articulos);
                          setclientesCC(Articulos);
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
      )}
    </>
  );
}

export default Clientes;
