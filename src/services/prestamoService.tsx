import apiClient from "./api";
import type {
  PrestamoRequest,
  DevolucionRequest,
  SpringPage,
  Prestamo,
} from "../types/models";

export const registrarPrestamo = async (
  data: PrestamoRequest,
): Promise<{ mensaje: string }> => {
  const response = await apiClient.post<{ mensaje: string }>(
    "/prestamos/registrar",
    data,
  );
  return response.data;
};

export const registrarDevolucion = async (
  data: DevolucionRequest,
): Promise<{ mensaje: string }> => {
  const response = await apiClient.post<{ mensaje: string }>(
    "/prestamos/devolver",
    data,
  );
  return response.data;
};

export const getAllPrestamos = async (
  page: number = 0,
  size: number = 20,
): Promise<SpringPage<Prestamo>> => {
  const response = await apiClient.get<SpringPage<Prestamo>>("/prestamos", {
    params: { page, size },
  });
  return response.data;
};

export const getAllDevoluciones = async (
  page: number = 0,
  size: number = 20,
): Promise<SpringPage<Prestamo>> => {
  const response = await apiClient.get<SpringPage<Prestamo>>(
    "/prestamos/devoluciones",
    {
      params: { page, size },
    },
  );
  return response.data;
};
