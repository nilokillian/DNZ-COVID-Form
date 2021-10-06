import { IEmployee } from "./../../../models/IEmployee";
import { AppDispatch } from "../../index";
import {
  SetErrorAction,
  SetEmployeeAction,
  SetAuthAction,
  SetLoadingAction,
  AuthActionsEnum,
  SetVerificationAction,
  SetIdentifiedAction,
  SetTokenAction,
} from "./types";
import { ErrorKeyEnum, IError } from "../../../models/IError";
// import { initialEmployeeState } from ".";
import { ILogin } from "../../../models/IAuth";
import AuthService from "../../../api/auth.service";

export const AuthActionCreators = {
  setEmployee: (payload: IEmployee | undefined): SetEmployeeAction => ({
    type: AuthActionsEnum.SET_EMPLOYEE,
    payload,
  }),
  setIsAuth: (payload: boolean): SetAuthAction => ({
    type: AuthActionsEnum.SET_AUTH,
    payload,
  }),
  setIndentified: (payload: boolean): SetIdentifiedAction => ({
    type: AuthActionsEnum.SET_IDENTIFIED,
    payload,
  }),
  setAuthError: (payload: IError | null): SetErrorAction => ({
    type: AuthActionsEnum.SET_ERROR,
    payload,
  }),
  setAuthLoading: (payload: boolean): SetLoadingAction => ({
    type: AuthActionsEnum.SET_LOADING,
    payload,
  }),
  setVarification: (payload: boolean): SetVerificationAction => ({
    type: AuthActionsEnum.SET_VERIFICATION,
    payload,
  }),

  setToken: (payload: string): SetTokenAction => ({
    type: AuthActionsEnum.SET_TOKEN,
    payload,
  }),

  logout: () => (dispatch: AppDispatch) => {
    dispatch(AuthActionCreators.setIndentified(false));
    dispatch(AuthActionCreators.setVarification(false));
    dispatch(AuthActionCreators.setEmployee(undefined));
    dispatch(AuthActionCreators.setToken(""));
    dispatch(AuthActionCreators.setIsAuth(false));
  },

  cancelVerification: () => (dispatch: AppDispatch) => {
    dispatch(AuthActionCreators.setEmployee(undefined));
    dispatch(AuthActionCreators.setIndentified(false));
    dispatch(AuthActionCreators.setVarification(false));
    dispatch(AuthActionCreators.setToken(""));
  },

  getToken:
    (code: number, employee: IEmployee) => async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setAuthLoading(true));
        const response = await AuthService.getToken({
          code,
          employeeNumber: employee.employeeNumber,
          firstName: employee.firstName,
          lastName: employee.lastName,
        });

        dispatch(AuthActionCreators.setToken(response.data.token));
        dispatch(
          AuthActionCreators.setEmployee({
            id: response.data.employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            mobile: employee.mobile,
            employeeNumber: employee.employeeNumber,
            businessUnit: response.data.employee.businessUnit,
            privacyStatementConsent:
              response.data.employee.privacyStatementConsent,
          })
        );

        if (response.data.employee.privacyStatementConsent) {
          dispatch(AuthActionCreators.setIsAuth(true));
        }

        dispatch(AuthActionCreators.setAuthLoading(false));
      } catch (error) {
        dispatch(
          AuthActionCreators.setAuthError({
            [ErrorKeyEnum.INPUT_CODE]: "Entered code is not correct",
          })
        );
      }
    },

  login: (payload: ILogin) => async (dispatch: AppDispatch) => {
    try {
      dispatch(AuthActionCreators.setAuthLoading(true));

      const response = await AuthService.login(payload);

      dispatch(AuthActionCreators.setAuthError(null));
      dispatch(AuthActionCreators.setAuthError(null));
      dispatch(AuthActionCreators.setEmployee(response.data));
      dispatch(AuthActionCreators.setIndentified(true));
      dispatch(AuthActionCreators.setVarification(true));
      dispatch(AuthActionCreators.setAuthLoading(false));
    } catch (error) {
      dispatch(
        AuthActionCreators.setAuthError({
          [ErrorKeyEnum.GET_EMPLOYEE]:
            "Employee with the given details was not found",
        })
      );
    }
  },
};
