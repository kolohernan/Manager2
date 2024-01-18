import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import Form from "../Componentes/Form";
import { funcionLogin } from "../funciones/Utilidades";

const Home = () => {
  const params = useParams();
  //console.log("muestro lo que trae params: - ", params);
  //Seteo el titulo de la pagina
  useEffect(() => {
    document.title = "Iniciar sesion";
  }, []);
  //las variables que voy a usar
  const { usuario, setUsuario, urlDominio } = useUserContext();

  const navigate = useNavigate();

  let jsonUsuario = [
    {
      user: "kolohernan",
      password: "123456",
      nombre: "Hernán",
      apellido: "Mohadile",
      cadenaArticulo:
        "<Codigo:Articulos><Descripcion:Detalles><Desc_Rubro:Rubros><Stock:Cantidades>",
      cadenaArticulo2:
        "<Codbarra:Codigo de Barras><Precio_Compra:Precio de compras><Dto_1><Dto_2><Dto_3><Precio_Costo:Precio de costos><Precio_Lp1:Precios lista 1>",
      cadenaCliente: "<Codigo:Código><Razon_social:Nombre><Direccion><Cuit>",
      cadenaCliente2:
        "<telefono:Teléfono><e-mail:Correo Electrónico><Web_empresa:Sitio Web><Saldo_Cc:Saldo>",
      visulizaCC_sn: "N",
      visulizaCpt_sn: "S",
    },
  ];

  // estado de error: donde guardar un string del que se va a mostrar
  const [erroruser, setErroruser] = useState(false);
  // estado si se logueo correctamente
  const [okuser, setokuser] = useState(false);

  //aca se define lo que hace el boton
  const onSubmit = (values) => {
    const datos = funcionLogin(urlDominio, values.text, values.password);

    console.log("aca los datos", datos);
    //comparo si el nombre de usuario que ingrese esta en el json
    //TODO: usar método .find
    const resultado = jsonUsuario?.filter((e) => {
      if (
        /*e.user === values.text && e.password === values.password */ 1 === 1
      ) {
        console.log("Datos correctos");
        // Armo un objeto para agrupar todos los datos del usuario
        const User = {
          nombre: e.nombre,
          apellido: e.apellido,
          cadenaArticulo: e.cadenaArticulo,
          cadenaArticulo2: e.cadenaArticulo2,
          cadenaCliente: e.cadenaCliente,
          cadenaCliente2: e.cadenaCliente2,
          visulizaCC_sn: e.visulizaCC_sn,
          visulizaCpt_sn: e.visulizaCpt_sn,
        };
        // Asigno los datos a objeto Usuario y me permita loguear
        setUsuario(User);

        localStorage.setItem("credenciales", JSON.stringify(User));
        setokuser(true);

        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        sleep(1000).then(() => {
          /*navigate(`/${params.id}/Dashboard/`);*/
        });

        //navigate("/Dashboard");
      } else {
        // setear el mensaje de error ^ en el estado
        console.log("error de usuarios");
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
