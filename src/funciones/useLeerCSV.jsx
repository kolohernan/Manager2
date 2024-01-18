import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import Papa from "papaparse";
export const useLeerCSV = (dominio) => {
  const { SeturlDominio, setKey } = useUserContext();
  const archivo = "http://localhost:5173/src/assets/dominio.csv";
  //Parseo el archivo asi lo convierto en JSON
  useEffect(() => {
    Papa.parse(archivo, {
      header: true,
      download: true,
      complete: function (results) {
        const encontrado = results.data?.find(
          (item) => item.Dominio === dominio
        );
        //se puede simplemente guardar cada uno de los campos así:
        SeturlDominio(encontrado?.Api_usuarios);
        setKey(encontrado?.Key);
        //alternativa guardar todo en un objeto (crear nuevo useState en UserConetxt)
        //setInformacionDominio(encontrado)
      },
    });
  }, [dominio]);
};
