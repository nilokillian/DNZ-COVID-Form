import { IError } from "../../../models/IError";

export enum ShotsOptionsEnum {
  ZERO = "zero",
  ONE = "one",
  TWO = "two",
  BOOSTER = "booster",
  EXEMPTION = "exemption",
}

export enum VaccinationActionsEnum {
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
  SET_FORM_MODE = "SET_FORM_MODE",
  SET_VACCINATION_RECORD = "SET_VACCINATION_RECORD",
}

export enum VaccinationFormModeEnum {
  NEW = "NEW",
  EDIT = "EDIT",
}

export enum Vaccine {
  ASTRAZENECA = "Astrazeneca",
  PFIZER = "Pfizer",
}

export interface IAttachment {
  id: number;
  name: string;
  file: string;
}

export interface IVaccinationRecord {
  shot: ShotsOptionsEnum;
  vaccine: Vaccine | null;
  firstShotDate: Date | null;
  secondShotDate: Date | null;
  boosterDate: Date | null;
  comment: string;
  attachments: IAttachment[];
}

export interface VaccinationState {
  formMode: VaccinationFormModeEnum;
  isLoading: boolean;
  error: IError | null;
  vaccinationRecord: IVaccinationRecord | null;
}

export interface SetVaccinationRecordAction {
  type: VaccinationActionsEnum.SET_VACCINATION_RECORD;
  payload: IVaccinationRecord | null;
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
  | SetVaccinationRecordAction
  | SetFormModeAction;
