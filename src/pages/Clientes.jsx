import { useEffect } from "react";
function Clientes() {
  //Seteo el titulo de la pagina
  useEffect(() => {
    document.title = "Busqueda de Clientes";
  }, []);
  return "Clientes";
}
export default Clientes;
