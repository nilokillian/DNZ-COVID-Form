import axios, { AxiosError } from "axios";
import { IEmployee } from "../context/App.context";
import { apiBase } from "./index";

export const getEmployeeWithQuery = async (
  employee: Partial<IEmployee>
): Promise<IEmployee> => {
  const queryParam = `?firstName=${employee.firstName}&lastName=${employee.lastName}&employeeNumber=${employee.employeeNumber}`;
  try {
    const response = await axios.get(`${apiBase}/employees${queryParam}`);

    return response.data.employee;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getVaccination = async (employeeId: number) => {
  try {
    return await axios.get(`${apiBase}/employees/${employeeId}/vaccination`);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getEmployeeId = async (id: number): Promise<any> => {
  try {
    return await axios.get(`${apiBase}/employees/${id}`);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createEmployee = async (employee: IEmployee) => {
  try {
    return await axios.post(`${apiBase}/employees`, employee);
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateEmployee = async (employee: Partial<IEmployee>) => {
  try {
    return await axios.patch(`${apiBase}/employees/${employee.id}`, employee);
  } catch (error: any) {
    throw new Error(error);
  }
};
