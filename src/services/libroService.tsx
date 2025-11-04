import apiClient from './api';
import type { Libro, LibroFormValues } from '../types/models';

// obtener todos los libros
export const getAllLibros = async (): Promise<Libro[]> => {
  const response = await apiClient.get<Libro[]>('/libros');
  return response.data;
};

// crear libro
export const createLibro = async (data: LibroFormValues): Promise<Libro> => {
  const response = await apiClient.post<Libro>('/libros', data);
  return response.data;
};

// actualizar libro
export const updateLibro = async (id: number, data: LibroFormValues): Promise<Libro> => {
  const response = await apiClient.put<Libro>(`/libros/${id}`, data);
  return response.data;
};

// borrar libro
export const deleteLibro = async (id: number): Promise<void> => {
  await apiClient.delete(`/libros/${id}`);
};