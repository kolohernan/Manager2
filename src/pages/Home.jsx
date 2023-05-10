import { useFetch } from "../funciones/useFetch";
import Navbar from "../Componentes/Navbar";
import Navbarside from "../Componentes/Navbar side";
import Header from "../Componentes/Header";
import { useState } from "react";

function Home() {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  //estado para buscar: query de la busqueda
  const [busqueda, setBusqueda] = useState("");

  //estado derivado -> a partir de data + input => obtener la data filtrada
  const resultado = data?.filter((elemento) => {
    // includes => true/false. filter requiere que retornes true/false
    // .toLowerCase() los hace en minuscula
    return elemento.name.toLowerCase().includes(busqueda.toLowerCase());
  });

  // guardar en estado el elemento seleccionado después de hacer click en Ver Mas
  const [cliente, Setcliente] = useState(null);

  return (
    <>
      <Navbar />
      <Navbarside cliente={cliente} />
      <div id="container-principal" className="container">
        <Header busqueda={busqueda} setBusqueda={setBusqueda} />
        {busqueda !== "" ? (
          <table className="table mt-5">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">E-mail</th>
                <th scope="col">Calle</th>
              </tr>
            </thead>
            <tbody>
              {/* el && es como un if, donde solo se ejectuta el verdadero*/}
              {/* el && es como un if, donde solo se ejectuta el verdadero*/}
              {error && <td>Error:..</td>}
              {loading && <td>Cargando...</td>}
              {/* Recorremos el array con map*/}
              {resultado?.map((user) => (
                <tr key={user.id}>
                  <td>{user.id} </td>
                  <td> {user.name} </td>
                  <td> {user.email} </td>
                  <td>
                    {user.address.street} <span>{user.address.suite}</span>
                  </td>
                  <td>
                    {/* A cada botón hay que darle un manejador de evento para que guarde en estado el elemento (user en este caso del map ^^^^ ) */}
                    <button
                      className="btn btn-manager"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#offcanvasDarkNavbar"
                      aria-controls="offcanvasDarkNavbar"
                      onClick={() => {
                        Setcliente(user);
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
      </div>
    </>
  );
}

export default Home;
