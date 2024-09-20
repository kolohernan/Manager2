import { parseColumnTitles } from "../funciones/Utilidades";
import Navbarside from "../Componentes/Navbar side";
import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { axiosInstance } from "../funciones/axios-instance";
import { useMutation } from "@tanstack/react-query";

function Articulos() {
  //Seteo el titulo de la pagina
  useEffect(() => {
    document.title = "Busqueda de Articulos";
  }, []);

  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  //traigo la cadena del Usercontext
  const { usuario, urlDominio, key } = useUserContext();

  // guardar en estado el elemento seleccionado después de hacer click en Ver Mas
  const [datosnav, SetDatosnav] = useState(null);

  const [search, setSearch] = useState("");
  //estado para mostrar si hay un error
  const [error, setError] = useState("");
  // ejemplo de cadena que viene por el usuario

  const handleSubmit = (e) => {
    e.preventDefault();
    buscarArticulo();
  };

  const {
    mutate: buscarArticulo,
    isPending,
    isError,
    data: searchResult,
  } = useMutation({
    mutationFn: async () => {
      return axiosInstance.get(
        `${urlDominio}Api_Articulos/Consulta?key=${key}&campo=OTRO&valor=%${search}%`
      );
    },
    onError: (e) => {
      // if (response.status >= 400) {
      //   throw new Error("Server responds with error!");
      // }
      if (e === "Deslogueado") {
        navigate(`/${params.id}/`);
        return;
      }
      /*if (e?.Error_Code) setError(mapaLabelError[e.Error_Code]);*/
      if (e?.Error_Code) setError(e.message);
      // siempre está bueno loggear el error para debuggear
      //console.error(e);
      console.log(e.message);
    },
  });

  ////////////////////////////////////////////////////////////////////////////////////////

  //const claves = Object.keys(data[0]);
  //console.log("RESULTADO DE las claves", claves);

  let Prod_Campos_Grid;
  let Prod_Campos_Det;
  let Grid;
  let Det;
  if (usuario.Prod_Campos_Grid === null || usuario.Prod_Campos_Grid === "") {
    Prod_Campos_Grid = "<Codigo><Descripcion>";
    Grid = "S";
  } else {
    Prod_Campos_Grid = usuario.Prod_Campos_Grid;
  }

  if (usuario.Prod_Campos_Det === null || usuario.Prod_Campos_Det === "") {
    Prod_Campos_Det = Prod_Campos_Grid;
    Det = "S";
  } else {
    Prod_Campos_Det = usuario.Prod_Campos_Det;
  }

  //separar la cadena con la funcion declarada
  const titulosColumnas = parseColumnTitles(Prod_Campos_Grid);

  console.log("titulos parseados", titulosColumnas);

  ////////////////////////////////////////////////////////////////////////////////////////
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${urlDominio}Api_Articulos/Consulta?key=${key}&campo=ID&valor=5028`
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  }, [key]);

  if (!data) {
    return <div>Cargando...</div>;
  } else {
    const claves = Object.keys(data[0]);
    console.log("RESULTADO EN DONDE TENGO QUE BUSCAR LAS CLAVES", claves);

    titulosColumnas.forEach((titulo) => {
      const valor = titulo[0];
      if (!claves.includes(valor)) {
        console.log(`El valor ${valor} no se encuentra en la lista de claves`);
        Grid = "S";
      } else {
        console.log(`todos los valores se encontraron`);
      }
    });
  }
  console.log(`VALOR DE DET`, Det);

  const titulosColumnasDefecto = [
    ["Codigo", "Codigo"],
    ["Descripcion", "Descripcion"],
  ];
  ////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      {/* Le paso a la Sidebar los datos del api de articulos y de las columnas */}
      {
        <Navbarside
          datosnav={datosnav}
          cadenaArticulo2={Prod_Campos_Det}
          Det={Det}
        />
      }

      <header id="header-busqueda" className="text-center fixed-top">
        <div className="container">
          <h2 className="py-5">Busqueda de Articulos</h2>
          <div className="input-group mb-3">
            <form className="input-group" onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control barra-Manager"
                placeholder="Escribe para buscar"
                aria-label="Escribe para buscar"
                aria-describedby="button-busqueda-clientes"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/*valor + onchange para controlarlo  */}
              <button
                className="btn btn-manager"
                type="submit"
                id="button-busqueda-clientes"
              >
                Buscar
              </button>
            </form>
          </div>
        </div>
      </header>
      {isPending ? (
        <div className="Resultado-api d-flex text-center">
          <h5 className="mx-5">Cargando</h5>
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Cargando</span>
          </div>
        </div>
      ) : isError ? (
        <div className="Resultado-api d-flex text-center">
          <h5 className="mx-5">Error</h5>
        </div>
      ) : (
        <div className="Resultado-api">
          {Grid === "S" ? (
            <div className="alert alert-warning" role="alert">
              Esta vista es por Defecto
            </div>
          ) : null}
          <table className="table table-mobile-responsive table-mobile-sided mt-5">
            <thead>
              <tr>
                {Grid === "S"
                  ? titulosColumnasDefecto.map((item) => {
                      return (
                        <th scope="col" key={item[0]}>
                          {item[1]}
                        </th>
                      );
                    })
                  : titulosColumnas.map((item) => {
                      return (
                        <th scope="col" key={item[0]}>
                          {item[1]}
                        </th>
                      );
                    })}
                <th scope="col">Ver mas</th>
              </tr>
            </thead>
            <tbody>
              {/* Recorremos el array con map*/}
              {searchResult?.data?.map((Articulos) => {
                //->
                const articulosConKeysEnMinusculas = Object.fromEntries(
                  Object.entries(Articulos).map(([k, v]) => {
                    return [k.toLowerCase(), v];
                  })
                );
                // Object.entries =>
                // { Kolo:1,Damian:2} => [["Kolo",1],["Damian",2]]
                // map => ([k,v])=> [k.toLowerCase,v]
                // [["kolo",1],["damian",2]]
                // Object.fromEntries (^^^) => { kolo:1,damian:2}
                return (
                  <tr key={articulosConKeysEnMinusculas.codigo}>
                    {titulosColumnas.map((item) => {
                      return (
                        <td data-content={item[1]} key={item[0]}>
                          {articulosConKeysEnMinusculas[item[0].toLowerCase()]}
                        </td>
                      );
                    })}
                    <td>
                      {/* A cada botón hay que darle un manejador de evento para que guarde en estado el elemento (Clientes en este caso del map ^^^^ ) */}
                      <button
                        className="btn btn-manager"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasDarkNavbar"
                        aria-controls="offcanvasDarkNavbar"
                        onClick={() => {
                          SetDatosnav(Articulos);
                        }}
                      >
                        Ver mas
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default Articulos;
