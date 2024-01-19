import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import Form from "../Componentes/Form";
import { useFetch } from "../funciones/useFetch";

const Home = () => {
  const params = useParams();
  //console.log("muestro lo que trae params: - ", params);
  //Seteo el titulo de la pagina
  useEffect(() => {
    document.title = "Iniciar sesion";
  }, []);
  //las variables que voy a usar
  const { usuario, setUsuario, urlDominio, key, login } = useUserContext();

  const navigate = useNavigate();

  // estado de error: donde guardar un string del que se va a mostrar
  const [erroruser, setErroruser] = useState(false);
  // estado si se logueo correctamente
  const [okuser, setokuser] = useState(false);

  const [datos, setDatos] = useState(false);

  const [search, setSearch] = useState("");

  // estado para guardar el resultado de la búsqueda
  const [searchResult, setSearchResult] = useState([]);
  //estado para mostrar si está cargando
  const [isLoading, setIsLoading] = useState(false);
  //estado para mostrar si hay un error
  const [error, setError] = useState("");

  //aca se define lo que hace el boton
  const onSubmit = async (values) => {
    // probamos hacer algo.. si falla nos vamos al catch
    try {
      // declaramos que se está cargando y limpiamos el error si hay alguno
      setIsLoading(true);
      setError("");
      // hacemos el fetch
      const response = await fetch(
        `${urlDominio}Api_Usuarios/Login?key=${key}&usuario=${values.text}&password=${values.password}`
      );
      const json = await response.json();
      console.log(json);
      setSearchResult(json);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }

    const sleep2 = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    sleep2(2000).then(() => {
      //Si el estado es OK
      if (searchResult?.[0].Estado === "OK") {
        console.log(searchResult?.[0].Estado);

        // Armo un objeto para agrupar todos los datos del usuario
        const User = {
          /*
        nombre: e.nombre,
        apellido: e.apellido,
        cadenaArticulo: e.cadenaArticulo,
        cadenaArticulo2: e.cadenaArticulo2,
        cadenaCliente: e.cadenaCliente,
        cadenaCliente2: e.cadenaCliente2,
        visulizaCC_sn: e.visulizaCC_sn,
        visulizaCpt_sn: e.visulizaCpt_sn,
        */
        };
        // Asigno los datos a objeto Usuario y me permita loguear
        setUsuario(User);

        localStorage.setItem("credenciales", JSON.stringify(User));
        setokuser(true);

        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        sleep(1000).then(() => {
          navigate(`/${params.id}/Dashboard/`);
        });

        //navigate("/Dashboard");
      } else {
        // setear el mensaje de error ^ en el estado
        console.log("Código del Error:", searchResult?.[0].Error_Code);
        console.log("Descripción del Error:", searchResult?.[0].Error_Msj);
        setErroruser(true);
      }
    });
  };

  return (
    <div id="container-home" className="container-fluid">
      <p></p>
      <div className="form-signin w-100 m-auto mt-5 text-center">
        {/* inicializo los valores en vacio */}
        <Form onSubmit={onSubmit} initialState={{ text: "", password: "" }}>
          {({ values, handleChange, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <img
                className="mb-4"
                src="../src/assets/logo.png"
                alt="Manager"
                height="57"
                id="imagen-login"
              />
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control barra-Manager"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={values.text}
                  onChange={handleChange}
                  name="text"
                />
                <label htmlFor="floatingInput">Usuario</label>
              </div>

              <div className="form-floating">
                <input
                  type="password"
                  className="form-control barra-Manager"
                  id="floatingPassword"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  name="password"
                />
                <label htmlFor="floatingPassword">Contraseña</label>
              </div>
              <hr></hr>
              <button className="w-100 btn btn-lg btn-login" type="submit">
                Iniciar sesion
              </button>
            </form>
          )}
        </Form>
        {erroruser ? (
          <div className="alert alert-danger alert-dismissible fade show mt-2 d-block">
            <strong>Error</strong> Los datos ingresados son incorrectos.
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              onClick={() => {
                setErroruser(false);
              }}
            ></button>
          </div>
        ) : null}
        {okuser ? (
          <div className="alert alert-success fade show mt-2 d-block text-center">
            <p>
              Bienvenido{" "}
              <strong>
                {usuario.nombre} {usuario.apellido}
              </strong>
            </p>
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Home;
