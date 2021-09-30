import axios from "axios";
import { apiBase } from ".";
import { VaccinationFormState } from "../models/IVaccinationFormState";
import { IVaccinationRecord } from "../store/reducers/vaccination/types";

export default class VaccinationService {
  static async createVaccination(data: VaccinationFormState, token: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      return await axios.post(
        `${apiBase}/_api/vaccination`,
        {
          ...data,
        },
        config
      );
    } catch (error) {
      console.log(error);
      throw new Error("Error saving vax record");
    }
  }

  static async getEmployeeVaccination(employeeId: number, token: string) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      return await axios.get<IVaccinationRecord>(
        `${apiBase}/_api/vaccination/employee/${employeeId}`,
        config
      );
    } catch (error) {
      console.log(error);
      throw new Error("Error getting vax8 for employee");
    }
  }

  static async updateVaccination(
    vaccinationId: number,
    data: Partial<VaccinationFormState>,
    token: string
  ) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      return await axios.put(
        `${apiBase}/_api/vaccination/${vaccinationId}`,
        {
          ...data,
        },
        config
      );
    } catch (error) {
      console.log(error);
      throw new Error("Error updating vax8 record");
    }
  }
}
