import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CuentaCorriente() {
  const params = useParams();
  //console.log("kolo", params);

  //Seteo el titulo de la pagina
  const [Url, setUrl] = useState(null);
  const url_cuenta = `http://localhost:5173/Dashboard/Clientes/${params.cuentaCorriente}`;
  const [clientes, setclientes] = useState(null);

  //Obtengo la longitud de la URL
  let clienteLongitud = url_cuenta.length;
  //Obtengo el indice desde donde arranca el codigo del cliente
  let clienteIndice = url_cuenta.indexOf("_");
  //Obtengo el codigo del cliente utilizando lo anterior
  let url_codCliente = url_cuenta.substring(clienteIndice + 1, clienteLongitud);
  //Obtengo los datos del cliente con respect al codigo
  // ASYNC
  const fetchCliente = async (e) => {
    try {
      // declaramos que se está cargando y limpiamos el error si hay alguno
      setIsLoading(true);
      setError(false);
      const responseCliente = await fetch(
        `http://chiarottotal.ddns.net:3381/v300/api/Api_Clientes/Consulta?key=ChatBotManager&campo=ID&valor=${url_codCliente}`
      );
      const jsonCliente = await responseCliente.json();
      setUrl(jsonCliente);
      if (responseCliente.ok) {
        console.log("llego Bien codigo cliente");
      } else {
        console.log("No llego codigo cliente");
        setError(true);
      }
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
  //const codCliente = clientesCC.Codigo;
  const [searchResult, setSearchResult] = useState([]);
  //estado para mostrar si está cargando
  const [isLoading, setIsLoading] = useState(false);
  //estado para mostrar si hay un error
  const [error, setError] = useState("");
  // ejemplo de cadena que viene por el usuario

  const handleSubmit = async (e) => {
    e.preventDefault();
    // probamos hacer algo.. si falla nos vamos al catch
    try {
      // declaramos que se está cargando y limpiamos el error si hay alguno
      setIsLoading(true);
      setError("");
      // hacemos el fetch
      const response = await fetch(
        `http://chiarottotal.ddns.net:3381/v300/api/Api_Clientes/ConsultaSaldoDet?key=ChatBotManager&cliente=${url_codCliente}&origen=*&rango_periodico=periodo&fecha_desde=${dateDesde}&fecha_hasta=${dateHasta}`
      );
      // importante llamar a `.json` para obtener la respuesta
      const json = await response.json();
      // guardamos lo que sea relevante de la request en el estado q declaramos para los resultados.
      // en este caso la respuesta tiene un `items` que tiene la lista de usuarios de github que dio como resultado
      setSearchResult(json);
      if (response.ok) {
        console.log("llego bien busqueda cuenta corriente");
      } else {
        console.log("NO llego bien busqueda cuenta corriente");
        setError(true);
      }
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

  useEffect(() => {
    // esto es asyncrono
    fetchCliente();
    //handleSubmit();
    //...
    //document.title = clientesCC.Razon_Social + " - Cuenta corriente";
  }, []);
  useEffect(() => {
    Url?.map((url) => {
      setclientes(url);
    });
  }, [Url]);

  if (!clientes) {
    <></>;
  } else {
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
              {clientes.Razon_Social}
            </button>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlush"
            >
              <div className="accordion-body">
                <p>
                  <b>Codigo:</b> {clientes.Codigo} <b>CUIT:</b>
                  {clientes.Cuit}
                </p>
                <p>
                  <b>Email:</b> {clientes.Email} <b>Tel:</b>
                  {clientes.Telefono}
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
          <div className="d-flex text-center">
            <h5 className="mx-5">Cargando</h5>
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
        ) : error ? (
          <div className="d-flex text-center">
            <h5 className="mx-5">Error</h5>
          </div>
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
              {searchResult.map((item) => {
                /* Obtengo la url del comprobante*/
                let url_comprobante = "";
                if (
                  item.Url_Ubicacion !== undefined &&
                  item.Url_Ubicacion !== null
                ) {
                  url_comprobante = item.Url_Ubicacion;
                  //console.log(url_comprobante);
                }
                /*Acumulador del total de toda la suma*/
                let total = searchResult.reduce(
                  (accumulator, items) => [
                    ...accumulator,
                    accumulator[accumulator.length - 1] ??
                      0 + parseFloat(items.Importe),
                  ],
                  []
                );

                let total2 = searchResult.reduce(
                  (acc, number) => acc + number.Importe,
                  0
                );

                /*Formato para la fecha */
                let fechaComprobante = new Date(item.Fecha);
                let currentDay = String(fechaComprobante.getDate()).padStart(
                  2,
                  "0"
                );
                let currentMonth = String(
                  fechaComprobante.getMonth() + 1
                ).padStart(2, "0");
                let currentYear = fechaComprobante.getFullYear();
                let fechaCpbt = `${currentDay}/${currentMonth}/${currentYear}`;
                let comprobante = `${item.Transaccion}${item.Tipocomprobante}${item.Ptoventa}${item.Nro}`;

                return (
                  <tbody>
                    <tr key={comprobante}>
                      <td> {fechaCpbt}</td>
                      <td>
                        <a
                          href={"http://" + url_comprobante}
                          target="_blank"
                          title=""
                        >
                          {item.Documento} {item.Tipocomprobante}{" "}
                          {item.Ptoventa}-{item.Nro}
                        </a>
                      </td>
                      <td> ${item.Importe.toLocaleString()}</td>
                      <td>${total2}</td>
                    </tr>
                  </tbody>
                );
              })}
              <tfoot>
                <tr>
                  <td></td>
                  <td></td>
                  <td>Total:</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </>
    );
  }
}
export default CuentaCorriente;
