import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Form from "../Componentes/Form";
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

  let jsonUsuario =
    '{"user":"hernan","password":"123456*","nombre":"Hernan","apellido":"Mohadile","cadenaArticulo":"<Codigo:Articulo><Descripcion:Detalle><Desc_Rubro:Rubro><Stock:Cantidad>","cadenaArticulo":"<Codigo:Articulo><Descripcion:Detalle><Desc_Rubro:Rubro><Stock:Cantidad>","cadenaArticulo2":"<Precio_Compra:Precio de compra><Precio_Costo:Precio de costo><Precio_Lp1:Precio lista 1>","cadenaCliente":"<Codigo:Código><Razon_social:Nombre><Direccion><Cuit>","cadenaCliente2":"<telefono:Teléfono><e-mail:Correo Electrónico><Web_empresa:Sitio Web><Saldo_Cc:Saldo>","visulizaCC_sn":"SI"}';

  let mostrarConsola = JSON.parse(jsonUsuario);
  console.log(mostrarConsola);

  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <div id="container-home" className="container-fluid">
      <p></p>
      <div className="form-signin w-100 m-auto mt-5 text-center">
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
