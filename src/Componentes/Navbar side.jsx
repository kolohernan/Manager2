import { parseColumnTitles } from "../funciones/Utilidades";

function Navbarside({ datosnav, cadenaArticulo2 }) {
  /*
  let ArticuloUsuario2 =
    "<Precio_Compra:Precio de compra><Precio_Costo:Precio de costo><Precio_Lp1:Precio lista 1>";
  */
    let ArticuloUsuario2 = cadenaArticulo2;

  //separar la cadena con la funcion declarada
  const titulosColumnasNav = parseColumnTitles(ArticuloUsuario2);

  return (
    <div className="container-fluid" id="Nav-MasDatos">
      <div
        className="offcanvas offcanvas-end text-bg-dark"
        tabIndex="-1"
        id="offcanvasDarkNavbar"
        aria-labelledby="offcanvasDarkNavbarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
            Mas Datos
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-group list-group-flush">
            {titulosColumnasNav.map((item) => {
              return (
                <li
                  className="list-group-item d-flex justify-content-between align-items-start"
                  key={item[0]}
                >
                  {item[1]} - {datosnav?.[item[0]]}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Navbarside;
