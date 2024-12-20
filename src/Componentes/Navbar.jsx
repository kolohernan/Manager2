import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { funcionLogout } from "../funciones/Utilidades";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "/src/assets/logo.png";
import { useEffect, useState } from "react";
import { logEvent } from "../funciones/axios-post-log2";

function Navbar() {
  const { usuario, setUsuario, urlDominio, key, dominio } = useUserContext();
  //traigo la cadena del Usercontext
  const navigate = useNavigate();
  const params = useParams();
  //console.log("dominio", dominio);
  const [ruta, setRuta] = useState("");
  const [datosEntidad, setDatosEntidad] = useState(null);

  useEffect(() => {
    if (usuario.Entidad_Tipo === "VND") {
      setRuta(
        `${urlDominio}Api_Vendedores/Consulta?key=${key}&campo=IDS&valor=${usuario.Entidad_Codigos}`
      );
    } else if (usuario.Entidad_Tipo === "CLI") {
      setRuta(
        `${urlDominio}Api_Clientes/Consulta?key=${key}&campo=IDS&valor=${usuario.Entidad_Codigos}`
      );
    }
  }, []);
  const consultaEntidad = async (e) => {
    try {
      const response = await fetch(ruta);
      //console.log("aca la respuesta del response", response);
      const json = await response.json();
      setDatosEntidad(json);
      if (response.ok) {
        //console.log("Respuesta de la entidad llego bien");
      } else {
        //console.log("Respuesta  de la entidad llego mal");
      }
      //console.log(json);
    } catch (e) {
      //console.log("aca muestro el error", e);
    } finally {
      //console.log("finally");
      //SetLogin(json)
    }
  };
  useEffect(() => {
    consultaEntidad();
  }, [ruta]);

  //console.log("VALOR DE DATOS ENTIDAD", datosEntidad);

  /* PARA CONTROLAR LA APERTURA Y CIERRE DE LA NAV EN MOBILE*/
  const [isOpen, setIsOpen] = useState(false);
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav
        className={`navbar navbar-dark navbar-expand-md bg-navbar-manager fixed-top ${
          isOpen ? "show" : ""
        }`}
      >
        <div className="container-fluid">
          <NavLink className="navbar-brand" to={`/${params.id}/Dashboard`}>
            <img
              src={Logo}
              alt="Manager"
              height="24"
              className="d-inline-block align-text-top"
              id="imagen-login"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            //data-bs-toggle="collapse"
            //data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul
              className="navbar-nav mb-1 mt-1 mb-lg-0 me-auto"
              onClick={closeNavbar}
            >
              {!usuario || usuario?.Prod_Sn !== "S" ? null : (
                <li className="nav-item mx-2">
                  <NavLink
                    to={`Articulos`}
                    className="nav-link"
                    aria-current="page"
                    href="#"
                  >
                    Articulos
                  </NavLink>
                </li>
              )}

              {!usuario || usuario?.Cli_Sn !== "S" ? null : (
                <li className="nav-item mx-2">
                  <NavLink
                    to={`Clientes`}
                    className="nav-link"
                    aria-current="page"
                    href="#"
                  >
                    Clientes
                  </NavLink>
                </li>
              )}
            </ul>

            {/*///////////////////////////*/}
            {usuario && (
              <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {usuario.Nombre_Usuario}
                  </a>
                  <ul className="dropdown-menu dropdown-manager">
                    <li className="lista-manager">
                      <h4>
                        {usuario.Nombre_Usuario} {usuario.Apellido_Usuario}
                      </h4>
                    </li>
                    <li className="lista-manager">
                      <p>
                        {usuario.Entidad_Tipo === "CLI"
                          ? "Cliente"
                          : usuario.Entidad_Tipo === "VND"
                          ? "Vendedor"
                          : "Usuario"}
                      </p>
                    </li>
                    <ul className="lista-manager lista-manager-fuente">
                      {datosEntidad?.map((item, index) => (
                        <li key={index}>
                          {usuario.Entidad_Tipo === "CLI" ? (
                            <p>{item.Razon_Social}</p>
                          ) : usuario.Entidad_Tipo === "VND" ? (
                            <p>
                              {item.Nombre} {item.Apellido}
                            </p>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                    <li className="lista-manager text-center">
                      <button
                        className="btn btn-login btn-sesion"
                        data-bs-toggle="modal"
                        data-bs-target="#ModalLogOut"
                      >
                        Cerrar sesion
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            )}
            {/*///////////////////////////*/}
          </div>
        </div>
      </nav>
      <div
        className="modal fade"
        id="ModalLogOut"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content rounded-0 text-center m-0">
            <div className="modal-header border-0">
              <img
                className="my-2 mx-auto d-block"
                src="../src/assets/logo.png"
                alt="Manager"
                height="57"
                id="imagen-login"
              />
            </div>
            <div className="modal-body m-0">Desea cerrar sesion?</div>
            <div className="modal-footer align-center border-0 d-block m-0">
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-login"
                onClick={() => {
                  const logData = {
                    key: key,
                    urlDominio: urlDominio,
                    Session_Id: usuario?.Session_Id,
                    Cod_Usuario: usuario?.Cod_Usuario,
                    pagina: "login",
                    accion: "Cierre sesion",
                    valor: null,
                    agent: "CLOUD",
                  };
                  logEvent(logData);
                  funcionLogout(urlDominio, key);
                  localStorage.removeItem("credenciales");
                  setUsuario(null);
                  navigate(`/${params.id}/`);
                }}
              >
                SI
              </button>
              <button
                type="button"
                className="btn btn-login"
                data-bs-dismiss="modal"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;
