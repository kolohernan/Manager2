import { useFetch } from "../funciones/useFetch";
import { parseColumnTitles } from "../funciones/Utilidades";
import Navbarside from "../Componentes/Navbar side";
import Header from "../Componentes/Header";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Articulos() {
  //Seteo el titulo de la pagina
  useEffect(() => {
    document.title = "Busqueda de Articulos";
  }, []);
  const location = useLocation();

  /*
 -------------------------------------------------------------------------------------------------------------
 -------------------------------------------------------------------------------------------------------------
 -------------------------------------------------------------------------------------------------------------
  const { data, loading, error } = useFetch(
    "http://chiarottotal.ddns.net:3381/v300/api/Api_Articulos/Consulta?key=ChatBotManager&campo=OTRO&valor=*"
  );

 
  //estado para buscar: query de la busqueda
  const [busqueda, setBusqueda] = useState("");

  //estado derivado -> a partir de data + input => obtener la data filtrada
  const resultado = data?.filter((elemento) => {
    // includes => true/false. filter requiere que retornes true/false
    // .toLowerCase() los hace en minuscula
    //return elemento.Descripcion.includes(busqueda);
    return elemento.Descripcion.toLowerCase().includes(busqueda.toLowerCase());
  });

  -------------------------------------------------------------------------------------------------------------
  -------------------------------------------------------------------------------------------------------------
  -------------------------------------------------------------------------------------------------------------
*/
  // guardar en estado el elemento seleccionado después de hacer click en Ver Mas
  const [cliente, Setcliente] = useState(null);

  const [search, setSearch] = useState("");
  // estado para guardar el resultado de la búsqueda
  const [searchResult, setSearchResult] = useState([]);
  //siempre está bueno mostrar si está cargando o si hay un error cuando se hace la request.
  //Asi que estos dos estados son para eso
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // ejemplo de cadena que viene por el usuario

  const mapaLabelError = {
    "-1": "Hubo una excepcion",
    "-11": "Datos no encontrados",
    //....
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // probamos hacer algo.. si falla nos vamos al catch
    try {
      // declaramos que se está cargando y limpiamos el error si hay alguno
      setIsLoading(true);
      setError("");
      // hacemos el fetch
      const response = await fetch(
        `http://chiarottotal.ddns.net:3381/v300/api/Api_Articulos/Consulta?key=ChatBotManager&campo=OTRO&valor=%${search}%`
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

  let ArticuloUsuario1 =
    "<Codigo:Articulo><Descripcion:Detalle><Desc_Rubro:Rubro><Stock:Cantidad>";

  //constante para mostrar
  const titulosColumnas2 = JSON.stringify(
    parseColumnTitles(ArticuloUsuario1)
  ).toLocaleLowerCase();

  //separar la cadena con la funcion declarada
  const titulosColumnas = parseColumnTitles(ArticuloUsuario1);
  return (
    <>
      <p>{titulosColumnas2}</p>
      <Navbarside cliente={cliente} />

      <header id="header-busqueda" className="text-center fixed-top">
        <div className="container">
          <h2 className="py-5">Busqueda de Articulos</h2>
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
        <h1>Loading...</h1>
      ) : error ? (
        <h1>error...</h1>
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
                          Setcliente(Articulos);
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

export default Articulos;
