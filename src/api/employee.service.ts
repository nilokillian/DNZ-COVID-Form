import axios from "axios";
import { IEmployee } from "../models/IEmployee";
import { apiBase } from "./index";

export default class EmployeeService {
  static async updateEmployeeConsent(
    id: number,
    employee: Partial<IEmployee>,
    token: string
  ) {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      return await axios.put(
        `${apiBase}/_api/employees/${id}/consent`,
        employee,
        config
      );
    } catch (error) {
      throw new Error("Error updating employee");
    }
  }
}
