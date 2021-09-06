import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useSharedState } from "../../context/App.context";
import { LoginPage } from "../../pages/login.page";
import { NotFoundPage } from "../../pages/not-found.page";
import { ProfilePage } from "../../pages/profile.page";
import { VaccinationPage } from "../../pages/vaccination.page";

import "../../App.css";

export const AnimatedSwitch = withRouter(({ location }) => {
  const [sharedState] = useSharedState();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="slide" timeout={300}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={LoginPage} />

          <Route path="/vaccination" component={VaccinationPage}>
            {/* {sharedState.verificationPassed ? (
              <VaccinationPage />
            ) : (
              <Redirect to="/login" />
            )} */}
          </Route>
          <Route path="/profile">
            {sharedState.verificationPassed ? (
              <ProfilePage />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route component={NotFoundPage} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
});
