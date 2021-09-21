import { AuthAction, AuthActionsEnum, AuthState } from "./types";

export const initialEmployeeState = {
  id: null,
  employeeNumber: "",
  email: "",
  lastName: "",
  mobile: "",
  privacyStatementConsent: false,
  firstName: "",
  businessUnit: { name: "" },
};

export const initialVerificationState = {
  code: "",
  isSent: false,
  passed: false,
};

const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  verification: initialVerificationState,
  error: null,
  employee: initialEmployeeState,
};

export default function authReducer(
  state = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case AuthActionsEnum.SET_AUTH:
      return { ...state, isAuth: action.payload, isLoading: false };

    case AuthActionsEnum.SET_EMPLOYEE:
      return { ...state, employee: action.payload };

    case AuthActionsEnum.SET_VERIFICATION:
      return { ...state, verification: action.payload };

    case AuthActionsEnum.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };

    case AuthActionsEnum.SET_LOADING:
      return { ...state, isLoading: action.payload };

    case AuthActionsEnum.CANCEL_VERIFICATION:
      return {
        ...state,
        verification: { isSent: false, code: "", passed: false },
      };

    default:
      return state;
  }
}
