export const parseColumnTitles = (titles) => {
  if (titles !== undefined) {
    const titulosParseados = titles.split(">").flatMap((item) => {
      if (!item) return [];
      const substring = item.substring(1);
      const separadoEnDosPuntos = substring.split(":");
      const tieneDosPuntos = separadoEnDosPuntos.length > 1; //v o f;
      // si tiene 2 puntos, se cumple la primera condicion, sino, repito el indice como titulo para mostrar
      return [
        tieneDosPuntos
          ? separadoEnDosPuntos
          : [separadoEnDosPuntos[0], separadoEnDosPuntos[0]],
      ];
    });
    return titulosParseados;
  }
};

export const funcionLogin = async (urlDominio, user, password, key) => {
  console.log("aca deberia llegar el dominio", urlDominio);
  console.log("aca deberia llegar el usuario", user);
  console.log("aca deberia llegar el password", password);
  //const { SetLogin } = useUserContext();
  try {
    const response = await fetch(
      `${urlDominio}Api_Usuarios/Login?key=${key}&usuario=${user}&password=${password}`
    );
    //console.log("aca la respuesta del response", response);
    const json = await response.json();
    if (response.ok) {
      console.log("Respuesta del login llego bien");
    } else {
      console.log("Respuesta del login llego mal");
    }
    console.log(json);
  } catch (e) {
    console.log("aca muestro el error", e);
  } finally {
    console.log("finally");
    //SetLogin(json)
  }
  return funcionLogin;
};
