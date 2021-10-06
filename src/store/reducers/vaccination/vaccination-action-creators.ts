import { AppDispatch } from "../..";
import VaccinationService, {
  Vax8Error,
} from "../../../api/vaccination.service";
import { ErrorKeyEnum, IError } from "../../../models/IError";
import {
  SetLoadingAction,
  SetFormModeAction,
  SetErrorAction,
  VaccinationActionsEnum,
  VaccinationFormModeEnum,
  IVaccinationRecord,
  SetVaccinationRecordAction,
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

  setVaccinationRecord: (
    payload: IVaccinationRecord | null
  ): SetVaccinationRecordAction => ({
    type: VaccinationActionsEnum.SET_VACCINATION_RECORD,
    payload,
  }),

  fetchVaccination:
    (employeeId: number, token: string) => async (dispatch: AppDispatch) => {
      dispatch(VaccinationActionCreators.setVaccinationLoading(true));

      try {
        const response = await VaccinationService.getEmployeeVaccination(
          employeeId,
          token
        );

        dispatch(VaccinationActionCreators.setVaccinationRecord(response.data));
        dispatch(
          VaccinationActionCreators.setFormMode(VaccinationFormModeEnum.EDIT)
        );
      } catch (error) {
        if (error instanceof Vax8Error && error.statusCode === 404) {
          dispatch(
            VaccinationActionCreators.setFormMode(VaccinationFormModeEnum.NEW)
          );
        } else {
          dispatch(
            VaccinationActionCreators.setVaccinationError({
              [ErrorKeyEnum.GET_VACCINATION]:
                "Getting vaccination record failed",
            })
          );
        }
      }

      dispatch(VaccinationActionCreators.setVaccinationLoading(false));
    },
};
