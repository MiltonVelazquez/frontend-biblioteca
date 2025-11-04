import apiClient from "./api";
import type { Multa, MultaUpdateFormValues } from "../types/models";

export const getAllMultas = async (): Promise<Multa[]> => {
  const response = await apiClient.get<Multa[]>("/multas");
  return response.data;
};

export const pagarMulta = async (id: number): Promise<void> => {
  await apiClient.post(`/multas/pagar/${id}`, {});
};

export const updateMontoMulta = async (
  id: number,
  data: MultaUpdateFormValues,
): Promise<Multa> => {
  const response = await apiClient.put<Multa>(`/multas/${id}`, data);
  return response.data;
};
