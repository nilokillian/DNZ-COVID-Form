import axios from "axios";
import { apiBase } from ".";
import { VaccinationFormState } from "../models/IVaccinationFormState";
import { IVaccinationRecord } from "../store/reducers/vaccination/types";

export default class VaccinationService {
  static async createVaccination(data: VaccinationFormState) {
    try {
      return await axios.post(`${apiBase}/_api/vaccination/saveRecord`, {
        ...data,
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error saving vax record");
    }
  }

  static async getEmployeeVaccination(employeeId: number) {
    try {
      return await axios.get<IVaccinationRecord>(
        `${apiBase}/_api/vaccination/getEmployeeVaccination/${employeeId}`
      );
    } catch (error) {
      console.log(error);
      throw new Error("Error getting vax8 for employee");
    }
  }

  static async updateVaccination(
    vaccinationId: number,
    data: Partial<VaccinationFormState>
  ) {
    try {
      return await axios.put(
        `${apiBase}/_api/vaccination/updateRecord/${vaccinationId}`,
        { ...data }
      );
    } catch (error) {
      console.log(error);
      throw new Error("Error updating vax8 record");
    }
  }
}
