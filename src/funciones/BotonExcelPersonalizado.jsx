import { useState } from "react";
import * as XLSX from "xlsx";

const BotonExcelPersonalizado = ({ cc_excel, clientes }) => {
  const [loading, setLoading] = useState(false);

  let saldoAcumulado = 0;

  const titulo = [{ A: "Reporte de Cuenta Corriente" }, {}];

  const datoClientes = [
    { A: "Cliente: " + clientes.Razon_Social + "    CUIT:" + clientes.Cuit },
    {},
  ];
  const datoClientes2 = [
    { A: "Email: " + clientes.Email + "    Tel:" + clientes.Telefono },
    {},
  ];
  const informacionAdicional = {
    A: "Creador por: Manager Software de Gestion",
  };

  const longitudes = [15, 35, 20, 20];

  const handleDownload = () => {
    setLoading(true);

    let tabla = [
      {
        A: "Fecha",
        B: "Comprobante",
        C: "Importe",
        D: "Saldo",
      },
    ];

    cc_excel.forEach((cc_excel) => {
      /*Formato para la fecha */
      let fechaComprobante = new Date(cc_excel.Fecha);
      let currentDay = String(fechaComprobante.getDate()).padStart(2, "0");
      let currentMonth = String(fechaComprobante.getMonth() + 1).padStart(
        2,
        "0"
      );
      let currentYear = fechaComprobante.getFullYear();
      let fechaCpbt = `${currentDay}/${currentMonth}/${currentYear}`;
      /*Armo el comprobante */
      let comprobante = `${cc_excel.Documento} ${cc_excel.Tipocomprobante} ${cc_excel.Ptoventa}-${cc_excel.Nro}`;
      /* calculo el sando acumulado */
      saldoAcumulado += cc_excel.Importe;

      tabla.push({
        A: fechaCpbt,
        B: comprobante,
        C:
          "$" +
          cc_excel.Importe.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          }),
        D:
          "$" +
          saldoAcumulado.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          }),
      });
    });

    const dataFinal = [
      ...titulo,
      ...datoClientes,
      ...datoClientes2,
      ...tabla,
      informacionAdicional,
    ];

    setTimeout(() => {
      creandoArchivo(dataFinal);
      setLoading(false);
    }, 1000);

    const creandoArchivo = (dataFinal) => {
      const libro = XLSX.utils.book_new();

      const hoja = XLSX.utils.json_to_sheet(dataFinal, { skipHeader: true });

      hoja["!merges"] = [
        XLSX.utils.decode_range("A1:D1"),
        XLSX.utils.decode_range("A3:D3"),
        XLSX.utils.decode_range("A5:D5"),
      ];

      let propiedades = [];

      longitudes.forEach((col) => {
        propiedades.push({
          width: col,
        });
      });

      hoja["!cols"] = propiedades;

      XLSX.utils.book_append_sheet(libro, hoja, "Cuenta Corriente");
      XLSX.writeFile(libro, `Cuenta corriente ${clientes.Razon_Social}.xlsx`);
    };
  };
  return (
    <>
      {!loading ? (
        <button className="btn btn-manager" onClick={handleDownload}>
          Exportar Excel
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
export default BotonExcelPersonalizado;
