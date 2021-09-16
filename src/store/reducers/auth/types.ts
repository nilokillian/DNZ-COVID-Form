import { IEmployee } from "../../../models/IEmployee";
import { IError } from "../../../models/IError";
import { IVerificationCode } from "../../../models/IVerification";

export interface AuthState {
  isAuth: boolean;
  verification: IVerificationCode;
  employee: IEmployee;
  isLoading: boolean;
  error: IError | null;
}

export enum AuthActionsEnum {
  SET_AUTH = "SET_AUTH",
  SET_LOADING = "SET_LOADING",
  SET_EMPLOYEE = "SET_EMPLOYEE",
  SET_ERROR = "SET_ERROR",
  SET_VERIFICATION = "SET_VERIFICATION",
  CANCEL_VERIFICATION = "CANCEL_VERIFICATION",
}

export interface SetAuthAction {
  type: AuthActionsEnum.SET_AUTH;
  payload: boolean;
}

export interface SetEmployeeAction {
  type: AuthActionsEnum.SET_EMPLOYEE;
  payload: IEmployee;
}

export interface SetVerificationAction {
  type: AuthActionsEnum.SET_VERIFICATION;
  payload: IVerificationCode;
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
  | SetEmployeeAction
  | CalcelVerificationAction
  | SetVerificationAction
  | SetLoadingAction
  | SetErrorAction;
