import { useState, createContext, useContext, FC } from "react";

export interface IAttachment {
  name: string;
  file: string;
}

export interface IVaccination {
  id?: number;
  shots: number;
  firstShotDate: Date | null;
  seconShotDate: Date | null;
  thirdShotDate?: Date | null;
  hasExeptionCertificate: boolean;
  comment: string;
  attachment: IAttachment[];
}

export interface IEmployee {
  id?: number | null;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  employeeNumber: string;
  privacyStatementConsent: boolean;
  businessUnit: string;
  siteVisit?: [];
}

export interface IAppState {
  employee: IEmployee;
  sentVerificationCode: string;
  verificationPassed: boolean;
  loading: boolean;
  error: { [key: string]: string } | null;
}

const initialState: IAppState = {
  employee: {
    id: null,
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    employeeNumber: "",
    businessUnit: "",
    privacyStatementConsent: false,
  },
  loading: false,
  sentVerificationCode: "",
  verificationPassed: false,
  error: null,
};

const useAppState = () => useState(initialState);

const AppContext = createContext<ReturnType<typeof useAppState> | null>(null);

export const useSharedState = () => {
  const value = useContext(AppContext);
  if (!value) throw new Error("Please initialize");
  return value;
};

export const SharedStateProvider: FC = ({ children }) => (
  <AppContext.Provider value={useAppState()}> {children} </AppContext.Provider>
);
