export interface ILogin {
  firstName: string;
  lastName: string;
  employeeNumber: string;
}

export interface IGetToken extends ILogin {
  code: number;
}
