function Navbar() {

return(
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark fixed-top">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">
            <img src="./src/assets/logo.png" alt="Manager" height="24" className="d-inline-block align-text-top"/>
            </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="#">Productos</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" href="#">Clientes</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Pedidos</a>
                </li>
            </ul>
            </div>
        </div>
    </nav>
)
}
export default Navbar;