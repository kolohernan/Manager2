function Navbarside({ cliente }) {
  return (
    <div className="container-fluid">
      <div
        className="offcanvas offcanvas-end text-bg-dark"
        tabIndex="-1"
        id="offcanvasDarkNavbar"
        aria-labelledby="offcanvasDarkNavbarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
            Precios
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
              Precio de compra - {cliente?.Precio_Compra}
            </li>
            <li className="nav-item">
              Precio de costo - {cliente?.Precio_Costo}
            </li>
            <li className="nav-item">Precio final - {cliente?.Precio_Lp1}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Navbarside;
