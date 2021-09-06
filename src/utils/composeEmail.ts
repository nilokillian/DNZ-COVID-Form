import { IVerificationCodeEmail } from "../api/verification-code.api";

export const composeEmail = (sendTo: string, code: string) => {
  return {
    subject: "Downer  - vax 8 app verification code",
    sendTo: [sendTo],
    emailBody: `<h5>Your verification code: ${code} <h5>`,
  } as IVerificationCodeEmail;
};
