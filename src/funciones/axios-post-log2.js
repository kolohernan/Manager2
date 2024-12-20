import axios from "axios";

export const logEvent = async ({
  key,
  urlDominio,
  Session_Id,
  Cod_Usuario,
  pagina,
  accion,
  valor,
  agent,
}) => {
  try {
    const response = await axios.post(
      `${urlDominio}Api_Usuarios/InsertarSessionLog?key=${key}`,
      {
        key,
        urlDominio,
        Session_Id,
        Cod_Usuario,
        pagina,
        accion,
        valor,
        agent,
      }
    );
    console.log("Log enviado:", response.data);
  } catch (error) {
    console.error("Error al enviar el log:", error);
  }
};
