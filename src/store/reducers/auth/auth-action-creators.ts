import { AppDispatch } from "../../index";
import { IEmployee } from "../../../models/IEmployee";

import {
  SetErrorAction,
  SetEmployeeAction,
  SetAuthAction,
  SetLoadingAction,
  AuthActionsEnum,
  SetVerificationAction,
  CalcelVerificationAction,
} from "./types";
import { codeGenerator } from "../../../utils/codeGenerator";
import VerificationService from "../../../api/verification.service";
import { composeFlowRequest } from "../../../utils/compose";
import { ErrorKeyEnum, IError } from "../../../models/IError";
import EmployeeService from "../../../api/employee.service";
import { IVerificationCode } from "../../../models/IVerification";

export const AuthActionCreators = {
  setEmployee: (payload: IEmployee): SetEmployeeAction => ({
    type: AuthActionsEnum.SET_EMPLOYEE,
    payload,
  }),
  setIsAuth: (payload: boolean): SetAuthAction => ({
    type: AuthActionsEnum.SET_AUTH,
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
  setVarification: (payload: IVerificationCode): SetVerificationAction => ({
    type: AuthActionsEnum.SET_VERIFICATION,
    payload,
  }),

  cancelVerification: (): CalcelVerificationAction => ({
    type: AuthActionsEnum.CANCEL_VERIFICATION,
  }),

  sendVarificationCode:
    (employee: IEmployee) => async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setAuthLoading(true));
        dispatch(AuthActionCreators.setAuthError(null));
        const generatedCode = codeGenerator();

        const verification: IVerificationCode = {
          code: generatedCode,
          isSent: true,
          passed: false,
        };

        await VerificationService.sendVerificationCode(
          composeFlowRequest(employee, generatedCode)
        );

        dispatch(AuthActionCreators.setVarification(verification));
      } catch (error: any) {
        dispatch(
          AuthActionCreators.setAuthError({
            [ErrorKeyEnum.SEND_CODE]: "Sending verification code error",
          })
        );
      }
      dispatch(AuthActionCreators.setAuthLoading(false));
    },

  login:
    (firstName: string, lastName: string, employeeNumber: string) =>
    async (dispatch: AppDispatch) => {
      try {
        dispatch(AuthActionCreators.setAuthLoading(true));
        const response = await EmployeeService.getEmployee(
          firstName,
          lastName,
          employeeNumber
        );

        if (!response.data) {
          dispatch(
            AuthActionCreators.setAuthError({
              [ErrorKeyEnum.EMPLOYEE_NOT_FOUND]:
                "Employee with the given details was not found",
            })
          );
        } else {
          dispatch(AuthActionCreators.setAuthError(null));
          dispatch(AuthActionCreators.setEmployee(response.data));
        }
        dispatch(AuthActionCreators.setAuthLoading(false));
      } catch (error) {
        dispatch(
          AuthActionCreators.setAuthError({
            [ErrorKeyEnum.GET_EMPLOYEE]: "Something went wrong",
          })
        );
      }
    },
};
