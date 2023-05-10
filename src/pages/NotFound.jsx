import { Link, useRouteError } from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>404</h1>
      <p>No existe la pagina</p>
      <p>{error.statusText || error.message}</p>
      <Link to="/"> Volver al Inicio</Link>
    </div>
  );
};
export default NotFound;
