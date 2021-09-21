import { AppDispatch } from "../..";
import VaccinationService from "../../../api/vaccination.service";
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

  fetchVaccination: (employeeId: number) => async (dispatch: AppDispatch) => {
    dispatch(VaccinationActionCreators.setVaccinationLoading(true));

    try {
      const response = await VaccinationService.getEmployeeVaccination(
        employeeId
      );

      if (response.data) {
        dispatch(VaccinationActionCreators.setVaccinationRecord(response.data));
        dispatch(
          VaccinationActionCreators.setFormMode(VaccinationFormModeEnum.EDIT)
        );
      } else {
        dispatch(
          VaccinationActionCreators.setFormMode(VaccinationFormModeEnum.NEW)
        );
      }
    } catch (error) {
      dispatch(
        VaccinationActionCreators.setVaccinationError({
          [ErrorKeyEnum.GET_VACCINATION]: "Getting vaccination record failed",
        })
      );
    }

    dispatch(VaccinationActionCreators.setVaccinationLoading(false));
  },
};
