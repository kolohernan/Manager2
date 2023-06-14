import Searchbar from "./Searchbar";
import { useLocation } from "react-router-dom";

function Header({ busqueda, setBusqueda }) {
  const location = useLocation();

  return (
    <div className="text-center">
      <h2 className="pb-5">{document.title}</h2>
      <Searchbar busqueda={busqueda} setBusqueda={setBusqueda} />
    </div>
  );
}
export default Header;
