import React from 'react';
import type { Socio } from '../../types/models';

interface Props {
  socios: Socio[];
  onEdit: (socio: Socio) => void;
  onDelete: (id: number) => void;
}

const SocioList: React.FC<Props> = ({ socios, onEdit, onDelete }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Listado de Socios</h3>
      <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nro. Socio</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>DNI</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {socios.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>No hay socios registrados.</td>
            </tr>
          ) : (
            socios.map(socio => (
              <tr key={socio.idsocio}>
                <td>{socio.idsocio}</td>
                <td>{socio.nroSocio}</td>
                <td>{socio.nombre}</td>
                <td>{socio.apellido}</td>
                <td>{socio.dni}</td>
                <td style={{ textAlign: 'center' }}>
                  <button onClick={() => onEdit(socio)} style={{ marginRight: '5px' }}>
                    Editar
                  </button>
                  <button onClick={() => onDelete(socio.idsocio)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SocioList;