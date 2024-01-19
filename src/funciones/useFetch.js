import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  // lo usamos para verificar el estado de carga
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setError(error))
      //este metodo se ejecuta cuando terminan todas las promesas
      .finally(() => setLoading(false));
    //se pasa un array vacio, asi no se ejecuta cada vez que se actualiza la pagina y solo lo que esta dentro del hook
  }, [url]);

  return { data, loading, error };
}
