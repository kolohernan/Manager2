import { Link, useRouteError, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
const NotFound = () => {
  //Seteo el titulo de la pagina
  useEffect(() => {
    document.title = "Página Inexistente";
  }, []);
  const location = useLocation();
  const params = useParams();
  const error = useRouteError();

  console.log(error);

  return (
    <div className="container-fluid text-center" id="container-home">
      <h1 className="display-1 text-white fw-bold">404</h1>
      <br></br>
      <h1>No existe la pagina</h1>
      <h1>{error.statusText || error.message}</h1>
      <hr></hr>
      <h2>
        <Link to={`/${params.id}/Dashboard`}> Volver al Inicio</Link>
      </h2>
    </div>
  );
};
export default NotFound;
