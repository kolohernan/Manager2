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
