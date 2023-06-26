// controlar el input
//valor
// onChange -> manejador del evento
function Searchbar({ search, setSearch }) {
  return (
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
  );
}
export default Searchbar;
