import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { funcionLogout } from "../funciones/Utilidades";
import { useNavigate, useParams } from "react-router-dom";

function Navbar() {
  const { usuario, setUsuario, urlDominio, key } = useUserContext();
  //traigo la cadena del Usercontext
  const navigate = useNavigate();
  const params = useParams();

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-md bg-navbar-manager fixed-top">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to={`/${params.id}/Dashboard`}>
            <img
              src="http://localhost:5173/src/assets/logo.png"
              alt="Manager"
              height="24"
              className="d-inline-block align-text-top"
            />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mb-1 mt-1 mb-lg-0 me-auto">
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
              <li className="nav-item mx-2">
                <NavLink
                  to={`Pedidos`}
                  className="nav-link"
                  aria-current="page"
                  href="#"
                >
                  Pedidos
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
              {usuario && (
                <li className="nav-item mx-2">
                  <button
                    className="nav-link"
                    data-bs-toggle="modal"
                    data-bs-target="#ModalLogOut"
                  >
                    Cerrar sesion
                  </button>
                </li>
              )}
            </ul>
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
              />
            </div>
            <div className="modal-body m-0">Desea cerrar sesion?</div>
            <div className="modal-footer align-center border-0 d-block m-0">
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-login"
                onClick={() => {
                  funcionLogout(urlDominio, key);
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
