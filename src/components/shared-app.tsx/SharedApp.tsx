import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useSharedState } from "../../context/App.context";
import { LoginPage } from "../../pages/login.page";
import { NotFoundPage } from "../../pages/not-found.page";
import { ProfilePage } from "../../pages/profile.page";
import { SuccessPage } from "../../pages/success.page";
import { VaccinationPage } from "../../pages/vaccination.page";

export const SharedApp = () => {
  const [sharedState] = useSharedState();
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>

        <Route path="/login" component={LoginPage} />

        <Route path="/vaccination">
          {sharedState.verificationPassed ? (
            <VaccinationPage />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/profile">
          {sharedState.verificationPassed ? (
            <ProfilePage />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route path="/success" component={SuccessPage}></Route>

        <Route component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};
