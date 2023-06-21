// controlar el input
//valor
// onChange -> manejador del evento
function Searchbar({ busqueda, setBusqueda }) {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control barra-Manager"
        placeholder="Escribe para buscar"
        aria-label="Escribe para buscar"
        aria-describedby="button-busqueda-clientes"
        value={busqueda}
        onChange={(e) => {
          //e == event
          // target = input del dom
          // value
          setBusqueda(e.target.value);
        }}
      />
      {/*valor + onchange para controlarlo  */}
      <button
        className="btn btn-manager d-none"
        type="button"
        id="button-busqueda-clientes"
      >
        Buscar
      </button>
    </div>
  );
}
export default Searchbar;
