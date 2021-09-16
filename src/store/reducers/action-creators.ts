import { AuthActionCreators } from "./auth/auth-action-creators";
import { VaccinationActionCreators } from "./vaccination/vaccination-action-creators";

export const allActionCreators = {
  ...AuthActionCreators,
  ...VaccinationActionCreators,
};
