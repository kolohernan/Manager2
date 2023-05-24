import { useFetch } from "../funciones/useFetch";

import Navbarside from "../Componentes/Navbar side";
import Header from "../Componentes/Header";
import { useState } from "react";

function Articulos() {
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

  return (
    <>
      <Navbarside cliente={cliente} />
      <Header busqueda={busqueda} setBusqueda={setBusqueda} />
      {busqueda !== "" ? (
        <table className="table mt-5">
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Unidad</th>
              <th scope="col">Stock</th>
              <th scope="col">Precios</th>
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
                <td>{Clientes.Codigo} </td>
                <td>{Clientes.Descripcion} </td>
                <td>{Clientes.Unidad} </td>
                <td>{Clientes.Stock} </td>
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
      ) : null}
    </>
  );
}

export default Articulos;
