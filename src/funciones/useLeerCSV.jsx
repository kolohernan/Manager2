import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import Papa from "papaparse";
export const useLeerCSV = (dominio) => {
  const { SeturlDominio, setKey, setCss } = useUserContext();
  console.log("entro a leer el archivo CSV");
  const archivo = "http://localhost:5173/src/assets/dominio.csv";
  //const archivo = "https://drive.google.com/file/d/10tWR3hK6R1vJAuCmwz7o1V0WV4qt4MCm/view?usp=sharing";
  //const archivo = "http://kolohernan.000webhostapp.com/src/assets/dominio.csv";

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
          (item) => item.Dominio === dominio
        );
        //se puede simplemente guardar cada uno de los campos así:
        SeturlDominio(encontrado?.Api_usuarios);
        setKey(encontrado?.Key);
        setCss(encontrado?.Css);
        console.log(encontrado?.Css);
        //alternativa guardar todo en un objeto (crear nuevo useState en UserConetxt)
        //setInformacionDominio(encontrado)
      },
    });
  }, [SeturlDominio, dominio, setCss, setKey]);
};
