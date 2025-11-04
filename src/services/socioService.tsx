import apiClient from "./api";
import type {
  Socio,
  SocioFormValues,
  SocioUpdateFormValues,
} from "../types/models";

export const getAllSocios = async (): Promise<Socio[]> => {
  const response = await apiClient.get<Socio[]>("/socios");
  return response.data;
};

export const createSocio = async (data: SocioFormValues): Promise<Socio> => {
  const response = await apiClient.post<Socio>("/socios/alta", data);
  return response.data;
};

export const updateSocio = async (
  id: number,
  data: SocioUpdateFormValues,
): Promise<Socio> => {
  const response = await apiClient.put<Socio>(`/socios/${id}`, data);
  return response.data;
};

export const deleteSocio = async (id: number): Promise<void> => {
  await apiClient.delete(`/socios/${id}`);
};

export const checkDniExists = async (
  dni: string,
): Promise<{ existe: boolean }> => {
  const response = await apiClient.get(`/socios/verificar-dni/${dni}`);
  return response.data;
};
