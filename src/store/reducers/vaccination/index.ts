import {
  VaccinationAction,
  VaccinationActionsEnum,
  VaccinationFormModeEnum,
  VaccinationState,
} from "./types";

export const initialVaccinationState: VaccinationState = {
  isLoading: false,
  error: null,
  formMode: VaccinationFormModeEnum.NEW,
  vaccinationRecord: null,
};

export default function vaccinationReducer(
  state = initialVaccinationState,
  action: VaccinationAction
): VaccinationState {
  switch (action.type) {
    case VaccinationActionsEnum.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case VaccinationActionsEnum.SET_LOADING:
      return { ...state, isLoading: action.payload };

    case VaccinationActionsEnum.SET_FORM_MODE:
      return { ...state, formMode: action.payload };

    case VaccinationActionsEnum.SET_VACCINATION_RECORD:
      return { ...state, vaccinationRecord: action.payload };

    default:
      return state;
  }
}
