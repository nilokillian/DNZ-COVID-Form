import axios, { AxiosResponse } from "axios";
import { IGetToken, ILogin } from "../models/IAuth";
import { IEmployee } from "../models/IEmployee";
import { apiBase } from "./index";

export default class AuthService {
  static async login(payload: ILogin): Promise<AxiosResponse<IEmployee>> {
    try {
      return await axios.post<IEmployee>(`${apiBase}/_api/auth/login`, payload);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw new Error(
            "Sorry, can't login. Seems like something went wrong"
          );
        }
      }

      throw new Error("Sorry, can't login. Seems like something went wrong");
    }
  }

  static async getToken(payload: IGetToken) {
    try {
      return await axios.post(`${apiBase}/_api/auth/token`, payload);
    } catch (error) {
      throw new Error("Error fetching token");
    }
  }
}
