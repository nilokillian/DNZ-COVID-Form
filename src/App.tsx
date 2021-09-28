import { initializeIcons } from "@fluentui/font-icons-mdl2";
import Header from "./components/header/Header.component";
import { headerTitle, helpEmail } from "./const/strings";
// import { AppRouter } from "./components/AppRouter";

import "./App.css";
import { Link } from "@fluentui/react";
import { helpEmailStyle } from "./components/login/LoginFormObjectStyles";

const App = () => {
  initializeIcons();

  return (
    <div className="App">
      <div className="container">
        <Header title={headerTitle} />
        <div className="maintenance" style={{ padding: 20, lineHeight: 3 }}>
          <h5>
            This site is currently down for maintenance. To submit your Covid
            Vaccination Certificate please email{" "}
            <Link href={helpEmail} styles={helpEmailStyle}>
              VAXn8@downergroup.com
            </Link>
            with your employee number, first name and last name or contact your
            HR Representative.
          </h5>
        </div>
        {/* <AppRouter /> */}
      </div>
    </div>
  );
};

export default App;
