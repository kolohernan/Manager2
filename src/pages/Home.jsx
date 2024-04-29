import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Form from "../Componentes/Form";
import { useQueryClient } from "@tanstack/react-query";

const Home = () => {
  const params = useParams();
  //console.log("muestro lo que trae params: - ", params);
  //Seteo el titulo de la pagina
  useEffect(() => {
    document.title = "Iniciar sesion";
  }, []);

  const location = useLocation();
  const { pathname } = location;
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

  const queryClient = useQueryClient();
  //aca se define lo que hace el boton

  const onSubmit = async (values) => {
    // probamos hacer algo.. si falla nos vamos al catch
    try {
      // declaramos que se está cargando y limpiamos el error si hay alguno
      setIsLoading(true);
      setErroruser(false);
      setError("");
      // hacemos el fetch
      const response = await fetch(
        `${urlDominio}Api_Usuarios/Login?key=${key}&usuario=${values.text}&password=${values.password}`
      );
      const json = await response.json();

      const response2 = await fetch(
        `${urlDominio}Api_Usuarios/ConsultaUsuario?key=${key}&usuario=${values.text}`
      );
      const json2 = await response2.json();
      //Verifico si llego todo ok
      if (response.ok) {
        //Si el estado es OK, hago lo siguiente
        if (json?.[0].Estado === "OK") {
          console.log(json?.[0].Estado);
          //Guardo los datos en la variable User
          /*const User = {
            Nombre_Usuario: json?.[0].Nombre_Usuario,
            Apellido_Usuario: json?.[0].Apellido_Usuario,
            Session_Id: json?.[0].Session_Id,
            Solo_Web_Sn: json2?.[0].Solo_Web_Sn,
            Entidad_Tipo: json2?.[0].Entidad_Tipo, //Puede ser VEN | CLI | USR
            Entidad_Codigos: json2?.[0].Entidad_Codigos,
            Prod_Sn: json2?.[0].Prod_Sn, //Permite o no Búsqueda de Artículos
            Prod_Campos_Grid: json2?.[0].Prod_Campos_Grid,
            Prod_Campos_Det: json2?.[0].Prod_Campos_Det,
            Prod_Descarga_Sn: json2?.[0].Prod_Descarga_Sn, //Permite o no descarga de datos
            Cli_Sn: json2?.[0].Cli_Sn, //Permite o no Búsqueda de Clientes
            Cli_Campos_Grid: json2?.[0].Cli_Campos_Grid,
            Cli_Campos_Det: json2?.[0].Cli_Campos_Det,
            Cli_Cta_Cte_Sn: json2?.[0].Cli_Cta_Cte_Sn, //Muestra o no botón de consulta de Cuenta Corriente
            Cli_Descarga_Sn: json2?.[0].Cli_Descarga_Sn, //Permite o no descarga de datos
            Cli_Descarga_Cpbte_Sn: json2?.[0].Cli_Descarga_Cpbte_Sn, //Permite o no descarga de comprobantes
          };*/

          const User = {
            Nombre_Usuario: "Hernan",
            Apellido_Usuario: "Mohadile",
            Session_Id: json?.[0].Session_Id,
            Solo_Web_Sn: json2?.[0].Solo_Web_Sn,
            Entidad_Tipo: "USR", //Puede ser VEN | CLI | USR
            Entidad_Codigos: 6596,
            Prod_Sn: "S",
            Prod_Campos_Grid:
              "<Codigo:Articulosss><Descripcion:Detalles><Desc_Rubro:Rubros><Stock:Cantidades>",
            Prod_Campos_Det:
              "<Codigo:Articulosss><Descripcion:Detalles><Desc_Rubro:Rubros><Stock:Cantidades>",
            Prod_Descarga_Sn: "S",
            Cli_Sn: "S",
            Cli_Campos_Grid:
              "<Codigo:Codio><Razon_Social:Razon Social><Direccion:Direccion><Ciudad_Desc:Ciudad>",
            Cli_Campos_Det:
              "<Codigo:Codigo><Razon_Social:Razon Social><Direccion:Direccion><Ciudad_Desc:Ciudad>",
            Cli_Cta_Cte_Sn: "S",
            Cli_Descarga_Sn: "S",
            Cli_Descarga_Cpbte_Sn: "N",
          };

          //Guardo los datos de User en la vatiable Usuario
          setUsuario(User);
          console.log("datos de usuario", User);
          //Guardo los datos en el localstorage
          localStorage.setItem("credenciales", JSON.stringify(User));
          //Seteo variable asi muestro el cartel de bienvenido
          setokuser(true);
          //Hago una pausa y redirijo al dashboard
          const sleep = (ms) =>
            new Promise((resolve) => setTimeout(resolve, ms));
          sleep(1000).then(() => {
            queryClient.invalidateQueries(["estado"]);
            navigate(`/${params.id}/Dashboard/`);
          });
        }
      } else {
        setErroruser(true);
        console.log("Respuesta del login llego mal");
        console.log(json);
      }
      setSearchResult(json);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    // le asigno a crede el valor del localstorage en texto
    const crede = localStorage.getItem("credenciales");
    // SI LAS CREDENCIALES ESTAN EN EL LOCALSTORAGE
    if (crede) {
      // try catch para que no crashee la app si el parse falla. (JSON.parse puede fallar si la string no es parseable a JSON)
      try {
        //hago el parse
        const UsuarioLocal = JSON.parse(crede);
        // igualo el Usuario con User
        setUsuario(UsuarioLocal);
        // SI LAS CREDENCIALES ESTAN BIEN, LO REDIRIJO A LA PAGINA QUE QUIERE INGRESAR
        console.log("las credenciales estan bien");
        navigate(`${pathname}`);
      } catch (error) {
        // SI LAS CREDENCIALES ESTAN MAL, LO REDIRIJO A LA PAGINA QUE QUIERE INGRESAR
        navigate(`/${params.id}/NotFound`);
      }
    } else {
      // SI LAS CREDENCIALES NO ESTAN EN EL LOCALSTORAGE, LOS MANDO AL HOME PARA QUE SE PUEDAN LOGUEAR
      navigate(`/${params.id}`);
    }
  }, [navigate, params.id]);

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
                {console.log(usuario.Nombre_Usuario)}
                {usuario.Nombre_Usuario} {usuario.Apellido_Usuario}
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
