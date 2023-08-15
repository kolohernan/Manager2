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
  const { usuario, setUsuario, nombres, setNombres, apellidos, setApellidos , cadenaArticulo, setCadenaArticulo, cadenaArticulo2 , setCadenaArticulo2} =
    useUserContext();

  const navigate = useNavigate();

  //defino un json
  let jsonUsuario = [
    {
      user: "kolohernan",
      password: "123456",
      nombre: "Hernán",
      apellido: "Mohadile",
      cadenaArticulo:
        "<Codigo:Articulos><Descripcion:Detalles><Desc_Rubro:Rubros><Stock:Cantidades>",
      cadenaArticulo2:
        "<Precio_Compra:Precio de compras><Precio_Costo:Precio de costos><Precio_Lp1:Precios lista 1>",
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
        "<Precio_Compra:Precio de compra><Precio_Costo:Precio de costo><Precio_Lp1:Precio lista 1>",
      cadenaCliente: "<Codigo:Código><Razon_social:Nombre><Direccion><Cuit>",
      cadenaCliente2:
        "<telefono:Teléfono><e-mail:Correo Electrónico><Web_empresa:Sitio Web><Saldo_Cc:Saldo>",
      visulizaCC_sn: "S",
      visulizaCpt_sn: "S",
    },
  ];

  const Cartel = () => {
    return (
      <>
        <div class="alert alert-danger alert-dismissible fade show">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
          ></button>
          <strong>Eror</strong> Los datos ingresados son incorrectos.
        </div>
      </>
    );
  };

  //aca se define lo que hace el boton
  const onSubmit = (values) => {

    /*
    //comparo si el nombre de usuario que ingrese esta en el json
    const resultado = jsonUsuario?.filter((e) => {
      return e.user.toLowerCase() === values.text.toLowerCase();
    });
    console.log({ resultado });
    */

    //comparo si el nombre de usuario que ingrese esta en el json
    const resultado = jsonUsuario?.filter((e) => {
      if (
        e.user.toLowerCase() === values.text.toLowerCase() &&
        e.password.toLowerCase() === values.password.toLowerCase()
      ) {
        setUsuario(true);
        setNombres(e.nombre);
        setApellidos(e.apellido);
        setCadenaArticulo(e.cadenaArticulo);
        setCadenaArticulo2(e.cadenaArticulo2);
        navigate("/Dashboard");
      } else {
        console.log("Los datos son erroneos");
        Cartel();
      }
    });
    console.log({ resultado });
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
      </div>
    </div>
  );
};
export default Home;
