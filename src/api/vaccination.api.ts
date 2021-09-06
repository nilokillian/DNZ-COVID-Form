import axios from "axios";
import { IVaccination } from "../context/App.context";
import { apiBase } from "./index";

export const createVaccination = async (data: IVaccination) => {
  try {
    return await axios.post(`${apiBase}/vaccination`, data);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateVaccination = async (
  vaccinationId: number,
  data: Partial<IVaccination>
) => {
  try {
    return await axios.put(`${apiBase}/vaccination/${vaccinationId}`, data);
  } catch (error: any) {
    throw new Error(error);
  }
};
