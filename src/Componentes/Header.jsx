import Searchbar from "./Searchbar";
import { useLocation } from "react-router-dom";

function Header({ search, setSearch }) {
  const location = useLocation();

  return (
    <header id="header-busqueda" className="text-center fixed-top">
      <div className="container">
        <h2 className="py-5">{document.title}</h2>
        <div className="input-group mb-3">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control barra-Manager"
              placeholder="Escribe para buscar"
              aria-label="Escribe para buscar"
              aria-describedby="button-busqueda-clientes"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {/*valor + onchange para controlarlo  */}
            <button
              className="btn btn-manager d-none"
              type="button"
              id="button-busqueda-clientes"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
export default Header;
