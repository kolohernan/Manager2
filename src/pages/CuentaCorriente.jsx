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

  /* Inicializo la variables de estado par aguardar las fechas*/
  const [dateDesde, setdateDesde] = useState(firstDayDate);
  const [dateHasta, setdateHasta] = useState(currentDate);
  const codCliente = clientesCC.Codigo;
  const [searchResult, setSearchResult] = useState([]);
  //estado para mostrar si está cargando
  const [isLoading, setIsLoading] = useState(false);
  //estado para mostrar si hay un error
  const [error, setError] = useState("");
  // ejemplo de cadena que viene por el usuario

  //ACA MANEJO LO QUE HACE EL BOTON DE BUSQUEDA
  const handleSubmit = async (e) => {
    e.preventDefault();
    // probamos hacer algo.. si falla nos vamos al catch
    try {
      // declaramos que se está cargando y limpiamos el error si hay alguno
      setIsLoading(true);
      setError("");
      // hacemos el fetch
      const response = await fetch(
        `http://chiarottotal.ddns.net:3381/v300/api/Api_Clientes/ConsultaSaldoDet?key=ChatBotManager&cliente=${codCliente}&origen=*&rango_periodico=periodo&fecha_desde=${dateDesde}&fecha_hasta=${dateHasta}`
      );
      // importante llamar a `.json` para obtener la respuesta
      const json = await response.json();
      // guardamos lo que sea relevante de la request en el estado q declaramos para los resultados.
      // en este caso la respuesta tiene un `items` que tiene la lista de usuarios de github que dio como resultado
      setSearchResult(json);
      // mirá la consola para ver qué forma tiene (esto desp borralo)
    } catch (e) {
      //si hubo un error esto viene acá... entonces agregamos un mensaje para notificar al usuario de que algo salió mal (esto lo vas a tener que renderizar abajo vos después)
      if (e?.Error_Code) setError(mapaLabelError[e.Error_Code]);
      // siempre está bueno loggear el error para debuggear
      console.error(e);
      //finally es para hacer cosas sin importar si hubo error o no. Ocurre siempre
    } finally {
      // no importa lo que pase, el "cargando" debería desactivarse cuando termina todo esto
      setIsLoading(false);
    }
  };
  return (
    <>
      <h1 className="mb-5">DETALLE DE CUENTA CORRIENTE</h1>

      {/* Acordeon para mostrar los datos del cliente*/}
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

      {/* Arranca el form de la busqueda*/}

      <form className="input-group mb-5" onSubmit={handleSubmit}>
        <input
          id="DateDesde"
          type="date"
          className="form-control"
          aria-label="Escribe para buscar"
          aria-describedby="button-busqueda-clientes"
          value={dateDesde}
          onChange={(e) => setdateDesde(e.target.value)}
        />
        <input
          id="DateHasta"
          type="date"
          className="form-control"
          aria-label="Escribe para buscar"
          aria-describedby="button-busqueda-clientes"
          value={dateHasta}
          onChange={(e) => setdateHasta(e.target.value)}
        />
        <button
          className="btn btn-manager"
          type="submit"
          id="button-busqueda-clientes"
        >
          Buscar
        </button>
      </form>
      {/* Arranca el resultado de la busqueda*/}

      {isLoading ? (
        <h1>Loading...</h1>
      ) : error ? (
        <h1>error...</h1>
      ) : (
        <div>
          <table className="table table-mobile-responsive table-mobile-sided mt-5">
            <thead>
              <tr>
                <th scope="col">Fecha</th>
                <th scope="col">Comprobante</th>
                <th scope="col">Importe</th>
                <th scope="col">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.map((item) => {
                let importes = 0;
                importes = importes + item.Importe;

                return (
                  <tr>
                    <td> {item.Fecha}</td>
                    <td>
                      {item.Documento} {item.Tipocomprobante} {item.Ptoventa}-
                      {item.Nro}
                    </td>
                    <td> ${item.Importe.toLocaleString()}</td>
                    <td> ${importes.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <td></td>
              <td></td>
              <td>Total:</td>
              <td></td>
            </tfoot>
          </table>
        </div>
      )}
    </>
  );
}
export default CuentaCorriente;
