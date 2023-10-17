import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Form from "../Componentes/Form";

const Home = () => {
  //Seteo el titulo de la pagina
  useEffect(() => {
    document.title = "Iniciar sesion";
  }, []);
  //las variables que voy a usar
  const { usuario, setUsuario } = useUserContext();

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
    {
      user: "gabriel",
      password: "654321",
      nombre: "Gabriel",
      apellido: "Sastre",
      cadenaArticulo:
        "<Codigo:Articulo><Descripcion:Detalle><Desc_Rubro:Rubro><Stock:Cantidad>",
      cadenaArticulo2:
        "<Precio_Compra:Precio de compra><Precio_Costo:Precio de costo><Precio_Lp1:Precio lista 1><Precio_Lp2:precio2><Precio_Lp3><Precio_Lp4><Precio_Lp5><Activo><locacion>",
      cadenaCliente: "<Codigo:Código><Razon_social:Nombre><Direccion><Cuit>",
      cadenaCliente2:
        "<telefono:Teléfono><e-mail:Correo Electrónico><Web_empresa:Sitio Web><Saldo_Cc:Saldo>",
      visulizaCC_sn: "S",
      visulizaCpt_sn: "S",
    },
  ];

  // estado de error: donde guardar un string del que se va a mostrar
  const [erroruser, setErroruser] = useState();

  //aca se define lo que hace el boton
  const onSubmit = (values) => {
    //comparo si el nombre de usuario que ingrese esta en el json
    //TODO: usar método .find
    const resultado = jsonUsuario?.filter((e) => {
      if (
        e.user.toLowerCase() === values.text.toLowerCase() &&
        e.password.toLowerCase() === values.password.toLowerCase()
      ) {
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

        navigate("/Dashboard");
      } else {
        // setear el mensaje de error ^ en el estado
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
      </div>
    </div>
  );
};
export default Home;
