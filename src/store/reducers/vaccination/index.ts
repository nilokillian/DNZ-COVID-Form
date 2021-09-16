import {
  VaccinationAction,
  VaccinationActionsEnum,
  VaccinationFormModeEnum,
  VaccinationState,
} from "./types";

const initialState: VaccinationState = {
  isLoading: false,
  error: null,
  formMode: VaccinationFormModeEnum.NEW,
};

export default function vaccinationReducer(
  state = initialState,
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

    default:
      return state;
  }
}
