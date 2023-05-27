import { useEffect } from "react";

function Pedidos() {
  //Seteo el titulo de la pagina
  useEffect(() => {
    document.title = "Realizar Pedidos";
  }, []);

  return "Pedidos";
}
export default Pedidos;
