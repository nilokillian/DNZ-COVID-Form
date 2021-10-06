import axios from "axios";
import { apiBase } from ".";
import { VaccinationFormState } from "../models/IVaccinationFormState";
import { IVaccinationRecord } from "../store/reducers/vaccination/types";

export class Vax8Error {
  statusCode: number;
  message: string;

  constructor(res: { statusCode: number; message: string }) {
    this.statusCode = res.statusCode;
    this.message = res.message;
  }
}

export interface CreateVaccinationDto extends VaccinationFormState {
  employeeId: number;
}

export default class VaccinationService {
  static async createVaccination(data: CreateVaccinationDto, token: string) {
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
      if (axios.isAxiosError(error)) {
        throw new Vax8Error(error.response?.data);
      }

      throw new Vax8Error({
        statusCode: 503,
        message: "Creating employee vaccination record failed",
      });
    }
  }

  static async getEmployeeVaccination(employeeId: number, token: string) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      return await axios.get<IVaccinationRecord>(
        `${apiBase}/_api/vaccination/employee/${employeeId}`,
        config
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Vax8Error(error.response?.data);
      }

      throw new Vax8Error({
        statusCode: 503,
        message: "Getting employee vaccination record failed",
      });
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
      if (axios.isAxiosError(error)) {
        throw new Vax8Error(error.response?.data);
      }

      throw new Vax8Error({
        statusCode: 503,
        message: "Updating employee vaccination record failed",
      });
    }
  }
}
