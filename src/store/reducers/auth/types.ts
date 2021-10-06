import { IEmployee } from "../../../models/IEmployee";
import { IError } from "../../../models/IError";

export interface AuthState {
  isAuth: boolean;
  identified: boolean;
  token: string;
  verificationCodeSent: boolean;
  employee: IEmployee | undefined;
  isLoading: boolean;
  error: IError | null;
}

export enum AuthActionsEnum {
  SET_AUTH = "SET_AUTH",
  SET_IDENTIFIED = "SET_IDENTIFIED",
  SET_TOKEN = "SET_TOKEN",
  SET_LOADING = "SET_LOADING",
  SET_EMPLOYEE = "SET_EMPLOYEE",
  UPDATE_EMPLOYEE = "UPDATE_EMPLOYEE",
  SET_ERROR = "SET_ERROR",
  SET_VERIFICATION = "SET_VERIFICATION",
  CANCEL_VERIFICATION = "CANCEL_VERIFICATION",
}

export interface SetAuthAction {
  type: AuthActionsEnum.SET_AUTH;
  payload: boolean;
}

export interface SetTokenAction {
  type: AuthActionsEnum.SET_TOKEN;
  payload: string;
}

export interface SetEmployeeAction {
  type: AuthActionsEnum.SET_EMPLOYEE;
  payload: IEmployee | undefined;
}

export interface UpdateEmployeeAction {
  type: AuthActionsEnum.UPDATE_EMPLOYEE;
  payload: Partial<IEmployee>;
}

export interface SetIdentifiedAction {
  type: AuthActionsEnum.SET_IDENTIFIED;
  payload: boolean;
}

export interface SetVerificationAction {
  type: AuthActionsEnum.SET_VERIFICATION;
  payload: boolean;
}

export interface CalcelVerificationAction {
  type: AuthActionsEnum.CANCEL_VERIFICATION;
}

export interface SetLoadingAction {
  type: AuthActionsEnum.SET_LOADING;
  payload: boolean;
}

export interface SetErrorAction {
  type: AuthActionsEnum.SET_ERROR;
  payload: IError | null;
}

export type AuthAction =
  | SetAuthAction
  | UpdateEmployeeAction
  | SetTokenAction
  | SetIdentifiedAction
  | SetEmployeeAction
  | CalcelVerificationAction
  | SetVerificationAction
  | SetLoadingAction
  | SetErrorAction;
