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

export const consultaSesion = async (urlDominio, key) => {
  //Obtengo el valor de las credenciales que tenogo guardadas
  const crede = localStorage.getItem("credenciales");
  // SI LAS CREDENCIALES ESTAN EN EL LOCALSTORAGE
  let Estado = "N";
  if (crede) {
    // try catch para que no crashee la app si el parse falla. (JSON.parse puede fallar si la string no es parseable a JSON)
    try {
      //hago el parse
      const UsuarioLocal = await JSON.parse(crede);
      console.log(
        "datos en las credenciales del localhost",
        UsuarioLocal.Session_Id
      );
      //Busco el session id en la API
      const response = await fetch(
        `${urlDominio}Api_Usuarios/ConsultaSessionId?key=${key}&id_session=${UsuarioLocal.Session_Id}`
      );
      const json = await response.json();
      if (response.ok) {
        console.log("Respuesta del login llego bien");
        console.log(json?.[0].Estado);
        Estado = json?.[0].Estado;
      } else {
        console.log("Respuesta del login llego mal");
      }
    } catch (error) {
      console.log("catch");
    } finally {
      console.log("finally");
    }
  } else {
    console.log("aca entra si no encuntro las credenciales");
  }

  return Estado;
};

export const funcionLogout = async (urlDominio, key) => {
  const crede = localStorage.getItem("credenciales");
  const UsuarioLocal = JSON.parse(crede);
  console.log(UsuarioLocal.Session_Id);
  //const { SetLogin } = useUserContext();
  try {
    const response = await fetch(
      `${urlDominio}Api_Usuarios/Logout?key=${key}&id_session=${UsuarioLocal.Session_Id}`
    );
    //console.log("aca la respuesta del response", response);
    const json = await response.json();
    if (response.ok) {
      console.log("Id_session borrado");
    } else {
      console.log("Id_session no borrado");
    }
    console.log(json);
  } catch (e) {
    console.log("aca muestro el error", e);
  } finally {
    console.log("finally");
    localStorage.removeItem("credenciales");
    //SetLogin(json)
  }
  return funcionLogout;
};
