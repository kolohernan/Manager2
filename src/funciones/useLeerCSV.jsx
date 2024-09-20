import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import Papa from "papaparse";
export const useLeerCSV = (dominio) => {
  const { SeturlDominio, setKey, setCss } = useUserContext();
  console.log("entro a leer el archivo CSV");
  const archivo =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSx02r5QD7r3OEGXwBweGaasGQtyln0qBpupOILgFy7g0chc14gjh1rHdnyZJqBAeX9Wb_1aJJ44a43/pub?gid=2024963071&single=true&output=csv";

  //Parseo el archivo asi lo convierto en JSON
  useEffect(() => {
    Papa.parse(archivo, {
      header: true,
      download: true,
      error: function (error) {
        console.log("error en paparse", error.code);
      },
      complete: function (results) {
        const encontrado = results.data?.find(
          (item) => item.Dominio.toLowerCase() === dominio.toLowerCase()
        );
        //se puede simplemente guardar cada uno de los campos así:
        //seteo el css a la web
        SeturlDominio(encontrado?.Api_usuarios);
        setKey(encontrado?.Key);
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", `${encontrado?.Css}`);
        // Append to the `head` element
        document.head.appendChild(link);
        setCss(true);
        //alternativa guardar todo en un objeto (crear nuevo useState en UserConetxt)
        //setInformacionDominio(encontrado)
      },
    });
  }, [SeturlDominio, dominio, setCss, setKey]);
};
