import React from 'react';
import type { Prestamo } from '../../types/models';

interface Props {
  prestamos: Prestamo[];
  titulo: string;
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return '-';
  try {
    return new Date(dateString).toLocaleDateString();
  } catch (e) {
    return dateString; 
  }
};

const PrestamoList: React.FC<Props> = ({ prestamos, titulo }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h3>{titulo}</h3>
      <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID Préstamo</th>
            <th>Libro</th>
            <th>Socio (Nro)</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin (Límite)</th>
            <th>Fecha Devolución</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>No hay registros para mostrar.</td>
            </tr>
          ) : (
            prestamos.map(p => (
              <tr key={p.idPrestamo}>
                <td>{p.idPrestamo}</td>
                <td>{p.libroTitulo} (ID: {p.idLibro})</td>
                <td>{p.socioNroSocio} (ID: {p.idSocio})</td>
                <td>{formatDate(p.fechaInicio)}</td>
                <td>{formatDate(p.fechaFin)}</td>
                <td>{formatDate(p.fechaDevolucion)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PrestamoList;