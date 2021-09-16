import axios from "axios";
import { apiBase } from ".";
import { IVaccinationFormState } from "../models/IVerification";

export default class VaccinationService {
  static async createVaccination(data: IVaccinationFormState) {
    try {
      return await axios.post(
        `${apiBase}/_api/vaccination/saveRecord`,
        JSON.stringify(data)
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async getEmployeeVaccination(employeeId: number) {
    try {
      return await axios.get<IVaccinationFormState>(
        `${apiBase}/_api/vaccination/getEmployeeVaccination/${employeeId}`
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static async updateVaccination(
    vaccinationId: number,
    data: Partial<IVaccinationFormState>
  ) {
    try {
      return await axios.put(
        `${apiBase}/_api/vaccination/updateRecord/${vaccinationId}`,
        data
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
