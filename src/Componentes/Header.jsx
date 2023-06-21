import Searchbar from "./Searchbar";
import { useLocation } from "react-router-dom";

function Header({ busqueda, setBusqueda }) {
  const location = useLocation();

  return (
    <header id="header-busqueda" className="text-center fixed-top">
      <div className="container">
        <h2 className="py-5">{document.title}</h2>
        <Searchbar busqueda={busqueda} setBusqueda={setBusqueda} />
      </div>
    </header>
  );
}
export default Header;
