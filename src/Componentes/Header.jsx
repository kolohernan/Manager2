import Searchbar from "./Searchbar";

function Header({ busqueda, setBusqueda }) {
  return (
    <div className="text-center">
      <h2 className="pb-5">Busqueda de Clientes</h2>
      <Searchbar busqueda={busqueda} setBusqueda={setBusqueda} />
    </div>
  );
}
export default Header;
