
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import type { Libro, LibroFormValues } from "../types/models";

import {
  getAllLibros,
  createLibro,
  updateLibro,
  deleteLibro,
} from "../services/libroService";
import LibroList from "../components/libros/librosList";
import LibroForm from "../components/libros/libroForm";

function LibrosPage() {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [libroAEditar, setLibroAEditar] = useState<Libro | null>(null);

  const cargarLibros = async () => {
    try {
      const response = await getAllLibros();
      setLibros(response.content); 
    } catch (error) {
      toast.error("Error al cargar los libros");
      console.error(error);
    }
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  const handleSubmit = async (values: LibroFormValues) => {
    if (libroAEditar) {
      await updateLibro(libroAEditar.idLibro, values);
    } else {
      await createLibro(values);
    }
    setLibroAEditar(null);
    cargarLibros();
  };

  const handleEdit = (libro: Libro) => {
    setLibroAEditar(libro);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Está seguro de que desea eliminar este libro?")) {
      try {
        await deleteLibro(id);
        toast.success("¡Libro eliminado!");
        cargarLibros();
      } catch (error) {
        toast.error("Error al eliminar el libro.");
        console.error(error);
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">← Volver al Inicio</Link>
      <h2>Gestión de Libros</h2>

      <LibroForm initialData={libroAEditar} onSubmit={handleSubmit} />

      <LibroList libros={libros} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}

export default LibrosPage;
