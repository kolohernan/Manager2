import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import BotonExcelDefault from "../funciones/BotonExcelDefault";
import BotonExcelPersonalizado from "../funciones/BotonExcelPersonalizado";

function CuentaCorriente() {
  const params = useParams();
  //console.log("kolo", params);

  const [Url, setUrl] = useState(null);
  const url_cuenta = `http://localhost:5173/Dashboard/Clientes/${params.cuentaCorriente}`;
  const [clientes, setclientes] = useState(null);
  const [SaldoAcum, setSaldoAcum] = useState(0);

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
        console.log("CARGA INICIAL - llego Bien codigo cliente");
      } else {
        console.log("CARGA INICIAL - No llego codigo cliente");
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

  const fetchCuentaCorriente = async (e) => {
    // probamos hacer algo.. si falla nos vamos al catch
    try {
      // declaramos que se está cargando y limpiamos el error si hay alguno
      setIsLoading(true);
      setError("");
      // hacemos el fetch
      const response = await fetch(
        `http://chiarottotal.ddns.net:3381/v300/api/Api_Clientes/ConsultaSaldoDet?key=ChatBotManager&cliente=cli${url_codCliente}vend&origen=*&rango_periodico=periodo&fecha_desde=${dateDesde}&fecha_hasta=${dateHasta}`
      );
      // importante llamar a `.json` para obtener la respuesta
      const json = await response.json();
      // guardamos lo que sea relevante de la request en el estado q declaramos para los resultados.
      // en este caso la respuesta tiene un `items` que tiene la lista de usuarios de github que dio como resultado
      setSearchResult(json);
      if (response.ok) {
        console.log("CARGA INICIAL - llego bien busqueda cuenta corriente");
      } else {
        console.log("CARGA INICIAL - NO llego bien busqueda cuenta corriente");
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
  // Funcion del boton
  const handleSubmit = async (e) => {
    e.preventDefault();
    // probamos hacer algo.. si falla nos vamos al catch
    try {
      // declaramos que se está cargando y limpiamos el error si hay alguno
      setIsLoading(true);
      setError("");
      // hacemos el fetch
      const response = await fetch(
        `http://chiarottotal.ddns.net:3381/v300/api/Api_Clientes/ConsultaSaldoDet?key=ChatBotManager&cliente=cli${url_codCliente}vend&origen=*&rango_periodico=periodo&fecha_desde=${dateDesde}&fecha_hasta=${dateHasta}`
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
    fetchCuentaCorriente();
    //...
  }, []);
  useEffect(() => {
    Url?.map((url) => {
      setclientes(url);
    });
  }, [Url]);

  if (!clientes) {
    <></>;
  } else {
    //Seteo el titulo de la pagina
    document.title = clientes.Razon_Social + " - Cuenta corriente";
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
            className="form-control mx-2"
            aria-label="Escribe para buscar"
            aria-describedby="button-busqueda-clientes"
            value={dateDesde}
            onChange={(e) => setdateDesde(e.target.value)}
          />
          <input
            id="DateHasta"
            type="date"
            className="form-control mx-2"
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
          <div
            className="alert alert-danger d-flex align-items-center"
            role="alert"
          >
            <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
              <symbol
                id="exclamation-triangle-fill"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </symbol>
            </svg>
            <svg
              className="bi flex-shrink-0 me-2"
              width="24"
              height="24"
              role="img"
              aria-label="Danger:"
            >
              <use xlinkHref="#exclamation-triangle-fill" />
            </svg>
            <div>Error</div>
          </div>
        ) : (
          <>
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Fecha</th>
                  <th scope="col">Comprobante</th>
                  <th scope="col">Importe</th>
                  <th scope="col">Saldo</th>
                </tr>
              </thead>
              <tbody>
                {searchResult.map((item, index, lastitem) => {
                  /* calculo el sando acumulado */
                  const saldoAcumulado = searchResult
                    .slice(0, index + 1)
                    .reduce((acumulado, item) => acumulado + item.Importe, 0);
                  /* Obtengo la url del comprobante*/
                  let url_comprobante = "";
                  if (
                    item.Url_Ubicacion !== undefined &&
                    item.Url_Ubicacion !== null
                  ) {
                    url_comprobante = item.Url_Ubicacion;
                    //console.log(url_comprobante);
                  }

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

                  /*Armo el comprobante */
                  let comprobante = `${item.Documento} ${item.Tipocomprobante} ${item.Ptoventa}-${item.Nro}`;
                  return (
                    <Fragment>
                      {/* Si llego al final agrego un renglon mas y muestro el total */}
                      {lastitem.length - 1 === index ? (
                        <>
                          <tr key={index}>
                            <td className="text-start">{fechaCpbt}</td>
                            <td className="text-start">
                              {url_comprobante ? (
                                <a
                                  href={"http://" + url_comprobante}
                                  target="_blank"
                                  title=""
                                >
                                  {comprobante}
                                </a>
                              ) : (
                                <>{comprobante}</>
                              )}
                            </td>
                            <td>${item.Importe.toLocaleString()}</td>
                            <td>${saldoAcumulado.toLocaleString()}</td>
                          </tr>
                          <tr className="table-dark">
                            <td></td>
                            <td></td>
                            <td className="text-end">Total:</td>
                            <td>${saldoAcumulado.toLocaleString()}</td>
                          </tr>
                        </>
                      ) : (
                        <tr key={index}>
                          <td className="text-start">{fechaCpbt}</td>
                          <td className="text-start">
                            {url_comprobante ? (
                              <a
                                href={"http://" + url_comprobante}
                                target="_blank"
                                title=""
                              >
                                {comprobante}
                              </a>
                            ) : (
                              <>{comprobante}</>
                            )}
                          </td>
                          <td>${item.Importe.toLocaleString()}</td>
                          <td>${saldoAcumulado.toLocaleString()}</td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
            <div className="text-end">
              <BotonExcelDefault cc_excel={searchResult} clientes={clientes} />
              <BotonExcelPersonalizado
                cc_excel={searchResult}
                clientes={clientes}
              />
            </div>
          </>
        )}
      </>
    );
  }
}
export default CuentaCorriente;
