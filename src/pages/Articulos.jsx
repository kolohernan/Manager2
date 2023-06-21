import { useFetch } from "../funciones/useFetch";
import { parseColumnTitles } from "../funciones/Utilidades";
import Navbarside from "../Componentes/Navbar side";
import Header from "../Componentes/Header";
import { useState, useEffect } from "react";

function Articulos() {
  //Seteo el titulo de la pagina
  useEffect(() => {
    document.title = "Busqueda de Articulos";
  }, []);

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
  // guardar en estado el elemento seleccionado después de hacer click en Ver Mas
  const [cliente, Setcliente] = useState(null);

  // ejemplo de cadena que viene por el usuario
  let ArticuloUsuario1 =
    "<Codigo:Articulo><Descripcion:Detalle><Desc_Rubro:Rubro><Stock:Cantidad>";

  //constante para mostrar
  const titulosColumnas2 = JSON.stringify(parseColumnTitles(ArticuloUsuario1));

  //separar la cadena con la funcion declarada
  const titulosColumnas = parseColumnTitles(ArticuloUsuario1);
  return (
    <>
      <p>{titulosColumnas2}</p>
      <Navbarside cliente={cliente} />
      <Header busqueda={busqueda} setBusqueda={setBusqueda} />
      {busqueda !== "" ? (
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
              {/* el && es como un if, donde solo se ejectuta el verdadero*/}
              {/* el && es como un if, donde solo se ejectuta el verdadero*/}
              {error && <td>Error:..</td>}
              {loading && <td>Cargando...</td>}
              {/* Recorremos el array con map*/}
              {resultado?.map((Clientes) => (
                <tr key={Clientes.Codigo}>
                  {titulosColumnas.map((item) => {
                    return (
                      <td data-content={item[1]} key={item[0]}>
                        {Clientes[item[0]]}
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
                        Setcliente(Clientes);
                      }}
                    >
                      Ver mas
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
}

export default Articulos;
