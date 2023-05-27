import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const Home = () => {
  //Seteo el titulo de la pagina
  useEffect(() => {
    document.title = "Iniciar sesion";
  }, []);

  //declaro las variables para determinar si esta logueado o no
  const { usuario, setUsuario } = useUserContext();

  const navigate = useNavigate();

  const handleLogin = () => {
    setUsuario(true);
    navigate("/Dashboard");
  };

  return (
    <div id="container-home" className="container-fluid">
      <div className="form-signin w-100 m-auto mt-5 text-center">
        <form>
          <img
            className="mb-4"
            src="../src/assets/logo.png"
            alt="Manager"
            height="57"
          />
          <div className="form-floating">
            <input
              type="text"
              className="form-control barra-Manager"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Usuario</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control barra-Manager"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Contraseña</label>
          </div>

          <hr></hr>
          <button onClick={handleLogin} className="w-100 btn btn-lg btn-login">
            Iniciar sesion
          </button>
        </form>
      </div>
    </div>
  );
};
export default Home;
