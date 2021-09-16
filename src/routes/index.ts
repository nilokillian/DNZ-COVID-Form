import { LoginPage } from "../pages/login.page";
import { VaccinationPage } from "../pages/vaccination.page";

export interface IRoute {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

export enum RouteNames {
  LOGIN_PAGE = "/login",
  VACCINATION_PAGE = "/",
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
];
