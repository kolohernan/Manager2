import { Fragment, useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  //Seteo el titulo de la pagina
  const params = useParams();
  useEffect(() => {
    document.title = "Inicio";
  }, []);
  const { usuario } = useUserContext();

  //tarda en cargar
  if (!usuario)
    return (
      <Fragment>
        <p>Cargando</p>
      </Fragment>
    );

  return (
    <>
      <div className="container">
        <h4>
          Hola {usuario.Nombre_Usuario} {usuario.Apellido_Usuario}
        </h4>
        <br />
        <p>
          <strong>Solo Web</strong> {usuario.Solo_Web_Sn}
        </p>
        <p>
          <strong>Cadena para Articulos</strong> {usuario.Prod_Campos_Grid}
        </p>
        <p>
          <strong>Cadena para Articulos NavSide</strong>{" "}
          {usuario.Prod_Campos_Det}
        </p>
        <p>
          <strong>Cadena para Clientes</strong> {usuario.cadenaCliente}
        </p>
        <p>
          <strong>Cadena para Clientes NavSide</strong> {usuario.cadenaCliente2}
        </p>
        <div className="row align-items-center justify-content-center">
          <div className="col-4">
            <NavLink
              to={`Articulos`}
              className="nav-link"
              aria-current="page"
              href="#"
            >
              <div className="card text-center text-white">
                <div className="card-body">
                  <h1>Articulos</h1>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="col-4">
            <NavLink
              to={`Clientes`}
              className="nav-link"
              aria-current="page"
              href="#"
            >
              <div className="card text-center text-white">
                <div className="card-body">
                  <h1>Clientes</h1>
                </div>
              </div>
            </NavLink>
          </div>
          <div className="col-4">
            <NavLink
              to={`Pedidos`}
              className="nav-link"
              aria-current="page"
              href="#"
            >
              <div className="card text-center text-white">
                <div className="card-body">
                  <h1>Pedidos</h1>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
