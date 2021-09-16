import axios, { AxiosResponse } from "axios";
import { IEmployee } from "../models/IEmployee";
import { apiBase } from "./index";

export default class EmployeeService {
  static async getEmployee(
    firstName: string,
    lastName: string,
    employeeNumber: string
  ): Promise<AxiosResponse<IEmployee>> {
    const queryParam = `?firstName=${firstName}&lastName=${lastName}&employeeNumber=${employeeNumber}`;

    try {
      return await axios.get(
        `${apiBase}/_api/employees/getEmployee/${queryParam}`
      );
    } catch (error) {
      console.log(error);
      throw new Error("Error getting employee");
    }
  }

  static async updateEmployee(id: number, employee: Partial<IEmployee>) {
    try {
      return await axios.put(
        `${apiBase}/_api/employees/updateEmployee/${id}`,
        employee
      );
    } catch (error) {
      console.log(error);
      throw new Error("Error updating employee");
    }
  }
}
