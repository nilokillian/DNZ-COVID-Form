import { LoginPage } from "../pages/login.page";
// import { ProfilePage } from "../pages/profile.page";
import { SuccessPage } from "../pages/success.page";
import { VaccinationPage } from "../pages/vaccination.page";

export interface IRoute {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

export enum RouteNames {
  LOGIN_PAGE = "/login",
  VACCINATION_PAGE = "/",
  SUCCESS_PAGE = "/success",
  EMPLOYEE_PROFILE = "EMPLOYEE_PROFILE",
}

export const publicRoutes: IRoute[] = [
  { path: RouteNames.LOGIN_PAGE, exact: true, component: LoginPage },
];

export const privateRoutes: IRoute[] = [
  {
    path: RouteNames.VACCINATION_PAGE,
    exact: true,
    component: VaccinationPage,
  },
  {
    path: RouteNames.SUCCESS_PAGE,
    exact: true,
    component: SuccessPage,
  },

  // {
  //   path: RouteNames.EMPLOYEE_PROFILE,
  //   exact: true,
  //   component: ProfilePage,
  // },
];
