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
          <strong>Entidad_Tipo</strong> {usuario.Entidad_Tipo}
        </p>
        <br />
        <p>
          <strong>Prod_Sn</strong> {usuario.Prod_Sn}
        </p>
        <p>
          <strong>Prod_Campos_Grid</strong> {usuario.Prod_Campos_Grid}
        </p>
        <p>
          <strong>Prod_Campos_Det</strong> {usuario.Prod_Campos_Det}
        </p>
        <p>
          <strong>Prod_Descarga_Sn</strong> {usuario.Prod_Descarga_Sn}
        </p>
        <br />
        <p>
          <strong>Cli_Sn</strong> {usuario.Cli_Sn}
        </p>
        <p>
          <strong>Cli_Campos_Grid</strong> {usuario.Cli_Campos_Grid}
        </p>
        <p>
          <strong>Cli_Campos_Det</strong> {usuario.Cli_Campos_Det}
        </p>
        <p>
          <strong>Cli_Cta_Cte_Sn</strong> {usuario.Cli_Cta_Cte_Sn}
        </p>
        <p>
          <strong>Cli_Descarga_Sn</strong> {usuario.Cli_Descarga_Sn}
        </p>
        <p>
          <strong>Cli_Descarga_Cpbte_Sn</strong> {usuario.Cli_Descarga_Cpbte_Sn}
        </p>

        <div className="row align-items-center justify-content-center">
          {!usuario || usuario?.Prod_Sn === "N" ? null : (
            <div className="col-6">
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
          )}
          {!usuario || usuario?.Cli_Sn === "N" ? null : (
            <div className="col-6">
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
          )}
        </div>
      </div>
    </>
  );
};
export default Dashboard;
