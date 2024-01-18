import { useState } from "react";

// funcion para separar por <> y :

export const parseColumnTitles = (titles) => {
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
};

export const funcionLogin = async (urlDominio, user, password) => {
  console.log("aca llegue");
  console.log("aca deberia llegar el dominio", urlDominio);
  console.log("aca deberia llegar el usuario", user);
  console.log("aca deberia llegar el password", password);
  try {
    const response = await fetch(
      `${urlDominio}Api_Usuarios/Login?key=ChatBotManager&usuario=${user}&password=${password}`
    );
    console.log("aca la respuesta del response", response);
    const json = await response.json();
    //setSearchResult(json);
    if (response.ok) {
      console.log("Se logueo");
    } else {
      console.log("NO se logueo");
    }
    console.log(json);
  } catch (e) {
    console.log("aca dio error");
    console.log("aca muestro el error", e);
  } finally {
  }
};
