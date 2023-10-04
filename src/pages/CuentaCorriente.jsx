import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

function CuentaCorriente() {
  //Seteo el titulo de la pagina
  useEffect(() => {
    document.title = "Cuenta Corriente";
  }, []);
  const { clientesCC } = useUserContext();

  /* Obtener las fechas necesarias para inicializar */
  const date = new Date();
  let currentDay = String(date.getDate()).padStart(2, "0");
  let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  let currentYear = date.getFullYear();
  let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
  let firstDayDate = `${currentYear}-${currentMonth}-01`;

  console.log(firstDayDate);
  const [dateDesde, setdateDesde] = useState(firstDayDate);
  const [dateHasta, setdateHasta] = useState(currentDate);

  return (
    <>
      <h1 className="mb-5">DETALLE DE CUENTA CORRIENTE</h1>
      <div className="accordion accordion-flush mb-5" id="accordionFlush">
        <div className="accordion-item">
          <h2 className="accordion-header" />
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            {clientesCC.Razon_Social}
          </button>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlush"
          >
            <div className="accordion-body">
              <p>
                <b>Codigo:</b> {clientesCC.Codigo} <b>CUIT:</b>
                {clientesCC.Cuit}
              </p>
              <p>
                <b>Email:</b> {clientesCC.Email} <b>Tel:</b>
                {clientesCC.Telefono}
              </p>
            </div>
          </div>
        </div>
      </div>
      <form className="input-group">
        <input
          id="DateDesde"
          type="date"
          className="form-control"
          aria-label="Escribe para buscar"
          aria-describedby="button-busqueda-clientes"
          value={dateDesde}
          /*
          onChange={(e) => setSearch(e.target.value)}*/
        />
        <input
          id="DateHasta"
          type="date"
          className="form-control"
          aria-label="Escribe para buscar"
          aria-describedby="button-busqueda-clientes"
          value={dateHasta}
          /*
          onChange={(e) => setSearch(e.target.value)}*/
        />
        <button
          className="btn btn-manager"
          type="submit"
          id="button-busqueda-clientes"
        >
          Buscar
        </button>
      </form>

      {console.log(clientesCC)}
    </>
  );
}
export default CuentaCorriente;
