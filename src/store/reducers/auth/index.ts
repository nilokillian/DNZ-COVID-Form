import { AuthAction, AuthActionsEnum, AuthState } from "./types";

const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  verification: { code: "", isSent: false, passed: false },
  error: null,
  employee: {
    id: 0,
    employeeNumber: "",
    email: "",
    lastName: "",
    mobile: "",
    privacyStatementConsent: false,
    firstName: "",
    businessUnit: { name: "" },
  },
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
