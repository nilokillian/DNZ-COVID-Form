import { IError } from "../../../models/IError";

export enum VaccinationActionsEnum {
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
  SET_FORM_MODE = "SET_FORM_MODE",
}

export enum VaccinationFormModeEnum {
  NEW = "NEW",
  EDIT = "EDIT",
}

export interface VaccinationState {
  formMode: VaccinationFormModeEnum;
  isLoading: boolean;
  error: IError | null;
}

export interface SetFormModeAction {
  type: VaccinationActionsEnum.SET_FORM_MODE;
  payload: VaccinationFormModeEnum;
}

export interface SetLoadingAction {
  type: VaccinationActionsEnum.SET_LOADING;
  payload: boolean;
}

export interface SetErrorAction {
  type: VaccinationActionsEnum.SET_ERROR;
  payload: IError | null;
}

export type VaccinationAction =
  | SetLoadingAction
  | SetErrorAction
  | SetFormModeAction;
