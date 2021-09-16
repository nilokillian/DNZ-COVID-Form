import { IError } from "../../../models/IError";
import {
  SetLoadingAction,
  SetFormModeAction,
  SetErrorAction,
  VaccinationActionsEnum,
  VaccinationFormModeEnum,
} from "./types";

export const VaccinationActionCreators = {
  setFormMode: (payload: VaccinationFormModeEnum): SetFormModeAction => ({
    type: VaccinationActionsEnum.SET_FORM_MODE,
    payload,
  }),

  setVaccinationError: (payload: IError | null): SetErrorAction => ({
    type: VaccinationActionsEnum.SET_ERROR,
    payload,
  }),
  setVaccinationLoading: (payload: boolean): SetLoadingAction => ({
    type: VaccinationActionsEnum.SET_LOADING,
    payload,
  }),
};
