import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";

const Dashboard = () => {
  //Seteo el titulo de la pagina
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  const { nombres, apellidos, cadenaArticulo, cadenaArticulo2 } = useUserContext();

  return (
    <>
      <h4>
        Bienvenido {nombres} {apellidos}
      </h4>
      <br/>
      <p><strong>Cadena para Articulos</strong> {cadenaArticulo}</p>
      <p><strong>Cadena para Articulos NavSide</strong> {cadenaArticulo2}</p>
    </>
  );
};
export default Dashboard;
