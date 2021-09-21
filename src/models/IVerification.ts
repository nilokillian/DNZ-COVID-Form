export enum VerificationFlowRunType {
  SMS = "SMS",
  EMAIL = "EMAIL",
}

export interface IVerificationCode {
  code: string;
  passed: boolean;
  isSent: boolean;
}

export interface IVerificationFlow {
  runType: VerificationFlowRunType;
  email: {
    sendTo: string;
    subject: string;
    body: string;
  };
  sms: { number: string; text: string };
}
