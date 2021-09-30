export interface IEmployee {
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  employeeNumber: string;
  privacyStatementConsent: boolean;
  businessUnit: string;
  siteVisit?: [];
}
