import React from "react";
import type { Multa } from "../../types/models";

interface Props {
  multas: Multa[];
  titulo: string;
  onEdit?: (multa: Multa) => void;
  onPay?: (id: number) => void;
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "-";
  const parts = dateString.split("T")[0].split("-");
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateString;
};

const MultaList: React.FC<Props> = ({ multas, titulo, onEdit, onPay }) => {
  const isPendiente = !!(onEdit && onPay);

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>{titulo}</h3>
      <table border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID Multa</th>
            <th>Socio</th>
            <th>Monto</th>
            <th>Fecha Creación</th>
            <th>ID Préstamo</th>
            {isPendiente && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {multas.length === 0 ? (
            <tr>
              <td colSpan={isPendiente ? 6 : 5} style={{ textAlign: "center" }}>
                No hay multas en esta categoría.
              </td>
            </tr>
          ) : (
            multas.map((multa) => (
              <tr key={multa.idMulta}>
                <td>{multa.idMulta}</td>
                <td>
                  {multa.socioNombreCompleto} ({multa.socioNroSocio})
                </td>
                <td>${multa.monto.toFixed(2)}</td>
                <td>{formatDate(multa.fechaGeneracion)}</td>
                <td>{multa.idPrestamo}</td>
                {isPendiente && (
                  <td style={{ textAlign: "center" }}>
                    <button
                      onClick={() => onEdit(multa)}
                      style={{ marginRight: "5px" }}
                    >
                      Editar
                    </button>
                    <button onClick={() => onPay(multa.idMulta)}>Pagar</button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MultaList;
