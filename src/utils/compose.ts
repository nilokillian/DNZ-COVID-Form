import { IEmployee } from "../models/IEmployee";
import {
  IVerificationFlow,
  VerificationFlowRunType,
} from "../models/IVerification";

export const composeMobile = (number: string) =>
  `+${number[0] + number[1]}-XXXX-XX-${number.substr(number.length - 4)}`;

export const composeFlowRequest = (
  employee: IEmployee,
  code: string
): IVerificationFlow => {
  const runType = employee.mobile
    ? VerificationFlowRunType.SMS
    : VerificationFlowRunType.EMAIL;

  return {
    runType,
    email: {
      sendTo: employee.email,
      subject: "Downer - Vax8 verification code",
      body: `<h5>Your verification code: ${code} <h5>`,
    },
    sms: {
      number: employee.mobile,
      text: `Your verification code for Downer - Vax8 : ${code}`,
    },
  };
};
