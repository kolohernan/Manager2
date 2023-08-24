import { Fragment, useEffect } from "react";
import { useUserContext } from "../context/UserContext";

const Dashboard = () => {
  //Seteo el titulo de la pagina
  useEffect(() => {
    document.title = "Dashboard";
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
      <h4>
        Bienvenido {usuario.nombre} {usuario.apellido}
      </h4>
      <br />
      <p>
        <strong>Cadena para Articulos</strong> {usuario.cadenaArticulo}
      </p>
      <p>
        <strong>Cadena para Articulos NavSide</strong> {usuario.cadenaArticulo2}
      </p>
    </>
  );
};
export default Dashboard;
