import React, { useState } from "react";
import * as XLSX from "xlsx";

const BotonExcelDefault = ({ cc_excel }) => {
  const [loading, setLoading] = useState(false);

  //console.log(cc_excel);
  const handleDownload = () => {
    setLoading(true);

    const libro = XLSX.utils.book_new();
    const hoja = XLSX.utils.json_to_sheet(cc_excel);

    XLSX.utils.book_append_sheet(libro, hoja, "Productos");

    setTimeout(() => {
      XLSX.writeFile(libro, "ProductosDefault.xlsx");
      setLoading(false);
    }, 1000);
  };
  return (
    <>
      {!loading ? (
        <button className="btn btn-manager" onClick={handleDownload}>
          Exportar
        </button>
      ) : (
        <button className="btn btn-manager" disabled>
          <div className="spinner-border text-warning" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </button>
      )}
    </>
  );
};
export default BotonExcelDefault;
