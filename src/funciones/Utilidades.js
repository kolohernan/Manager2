export const parseColumnTitles = (titles) => {
  if (titles !== undefined) {
    if (titles === null) {
      const titulosParseados = "Error";
      return titulosParseados;
    } else {
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
  let Estado = "N"; //true or false
  if (crede) {
    // try catch para que no crashee la app si el parse falla. (JSON.parse puede fallar si la string no es parseable a JSON)
    try {
      //hago el parse
      const UsuarioLocal = await JSON.parse(crede);
      //console.log("datos en las credenciales del localhost",UsuarioLocal.Session_Id);
      //Busco el session id en la API
      const response = await fetch(
        `${urlDominio}Api_Usuarios/ConsultaSessionId?key=${key}&id_session=${UsuarioLocal.Session_Id}`
      );
      const json = await response.json();
      if (response.ok) {
        //console.log("Respuesta del estado de sesion llego bien");
        //console.log(json?.[0].Estado);
        Estado = json?.[0].Estado;
        //console.log("valor de estado", Estado);
      } else {
        //console.log("Respuesta del estado de sesion llego mal");
      }
    } catch (error) {
      //console.log("catch", error);
    } finally {
      //console.log("finally");
    }
  } else {
    //console.log("aca entra si no encuntro las credenciales");
  }

  return Estado;
};

export const funcionLogout = async (urlDominio, key) => {
  const crede = localStorage.getItem("credenciales");
  const UsuarioLocal = JSON.parse(crede);
  //console.log(UsuarioLocal.Session_Id);
  //const { SetLogin } = useUserContext();
  try {
    const response = await fetch(
      `${urlDominio}Api_Usuarios/Logout?key=${key}&id_session=${UsuarioLocal.Session_Id}`
    );
    //console.log("aca la respuesta del response", response);
    const json = await response.json();
    if (response.ok) {
      //console.log("Id_session borrado");
    } else {
      //console.log("Id_session no borrado");
    }
    //console.log(json);
  } catch (e) {
    //console.log("aca muestro el error", e);
  } finally {
    //console.log("finally");
    localStorage.removeItem("credenciales");
    //SetLogin(json)
  }
  return funcionLogout;
};

export const consultaEntidad = async (urlDominio, key, entidad, ruta) => {
  //console.log("aca deberia llegar el dominio", urlDominio);
  //console.log("aca deberia llegar la key", key);
  //console.log("aca deberia llegar la entidad", entidad);
  //const { SetLogin } = useUserContext();
  try {
    const response = await fetch(ruta);
    //console.log("aca la respuesta del response", response);
    const json = await response.json();
    if (response.ok) {
      console.log("Respuesta de la entidad llego bien");
    } else {
      console.log("Respuesta  de la entidad llego mal");
    }
    console.log(json);
  } catch (e) {
    console.log("aca muestro el error", e);
  } finally {
    console.log("finally");
    //SetLogin(json)
  }
  console.log("consultaEntidad", consultaEntidad);
  return consultaEntidad;
};
