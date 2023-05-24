import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

function Navbar() {
  const { usuario, setUsuario } = useUserContext();

  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
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
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/Articulos"
                className="nav-link"
                aria-current="page"
                href="#"
              >
                Articulos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/Clientes"
                className="nav-link"
                aria-current="page"
                href="#"
              >
                Clientes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/Pedidos"
                className="nav-link"
                aria-current="page"
                href="#"
              >
                Pedidos
              </NavLink>
            </li>
            {user && (
              <li className="nav-item">
                <button onClick={() => setUsuario(false)}>Cerrar sesion</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
