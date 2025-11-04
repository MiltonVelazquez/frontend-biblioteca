// src/components/libros/LibroList.tsx
import React from "react";
import type { Libro } from "../../types/models";

interface Props {
  libros: Libro[];
  onEdit: (libro: Libro) => void;
  onDelete: (id: number) => void;
}

const LibroList: React.FC<Props> = ({ libros, onEdit, onDelete }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Listado de Libros</h3>
      <table border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>ISBN</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center" }}>
                No hay libros registrados.
              </td>
            </tr>
          ) : (
            libros.map((libro) => (
              <tr key={libro.idLibro}>
                <td>{libro.idLibro}</td>
                <td>{libro.titulo}</td>
                <td>{libro.autor}</td>
                <td>{libro.isbn}</td>
                <td>{libro.estado}</td>
                <td style={{ textAlign: "center" }}>
                  <button
                    onClick={() => onEdit(libro)}
                    style={{ marginRight: "5px" }}
                  >
                    Editar
                  </button>
                  <button onClick={() => onDelete(libro.idLibro)}>
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

export default LibroList;
