import axios from "axios";

export const SendDataComponent = (
  key,
  urlDominio,
  Session_Id,
  Cod_Usuario,
  pagina,
  accion,
  valor
) => {
  const sendData = async () => {
    const data = {
      Session_Id: Session_Id,
      Cod_Usuario: Cod_Usuario,
      pagina: pagina,
      accion: accion,
      valor: valor,
      agent: "CLOUD",
    };

    try {
      console.log("aca se intento enviar el log");
      const response = await axios.post(
        `${urlDominio}Api_Usuarios/InsertarSessionLog?key=${key}`,

        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Respuesta:", response.data);
    } catch (error) {
      console.error("Error enviando datos:", error);
    }
  };
  /*
  return (
    <div>
      <h1>Enviar Datos</h1>
      <button onClick={sendData}>Enviar</button>
    </div>
  );
  */
};
