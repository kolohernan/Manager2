import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { usuario, setUsuario } = useUserContext();
  const navigate = useNavigate();

  return (
    <>
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/Dashboard">
          <img
            src="./src/assets/logo.png"
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
          <ul className="navbar-nav mb-2 mb-lg-0 me-auto">
            <li className="nav-item">
              <NavLink
                to="/Dashboard/Articulos"
                className="nav-link"
                aria-current="page"
                href="#"
              >
                Articulos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/Dashboard/Clientes"
                className="nav-link"
                aria-current="page"
                href="#"
              >
                Clientes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/Dashboard/Pedidos"
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
              <li className="nav-item">
                <button className="nav-link" data-bs-toggle="modal" data-bs-target="#ModalLogOut">
                  Cerrar sesion
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
    <div class="modal fade" id="ModalLogOut" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content rounded-0 text-center my-3">
            <div class="modal-header border-0">
            <img
                className="my-2 ms-auto"
                src="../src/assets/logo.png"
                alt="Manager"
                height="57"
              />
            </div>
            <div className="modal-body my-2">
              Desea cerrar sesion?
            </div>
            <div className="modal-footer align-center border-0 d-block my-3">
              <button type="button" className="btn btn-login" data-bs-dismiss="modal">No</button>
              <button 
                type="button" 
                data-bs-dismiss="modal"
                className="btn btn-login"
                onClick={() => {
                  setUsuario(false);
                  navigate("/");
                }}>‎ SI ‎
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Navbar;
