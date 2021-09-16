import { ShotsOptionsEnum } from "./IShotsSelection";

export enum VerificationFlowRunType {
  SMS = "SMS",
  EMAIL = "EMAIL",
}

export interface IVerificationCode {
  code: string;
  passed: boolean;
  isSent: boolean;
}

export interface IAttachment {
  id?: number;
  name: string;
  file: string;
}

export interface IVaccinationFormState {
  id?: number;
  employeeId: number;
  shot: ShotsOptionsEnum;
  firstShotDate: Date | null;
  seconShotDate: Date | null;
  boosterDate: Date | null;
  comment: string;
  attachments: IAttachment[];
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
