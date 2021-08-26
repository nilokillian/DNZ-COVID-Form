import { useState, useEffect } from "react";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { Form } from "./components/form/Form.component";
import Header from "./components/header/Header.component";
import { UserConsent } from "./components/consent/Consent.component";
import { companyPolicy } from "./const/strings";
import { MessageBarType } from "@fluentui/react";

import "./App.css";

type User = {
  consent: boolean;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const App = () => {
  initializeIcons();

  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    //API call to set user
  }, []);

  return (
    <div className="App">
      <div className="container">
        <Header title="Codid-19 Vaccine Tracker" />
        {!user.consent && (
          <UserConsent
            text={companyPolicy}
            messageType={MessageBarType.info}
            onChange={() => {
              setUser((prev) => ({ ...prev, consent: true }));
            }}
            consent={true}
          />
        )}

        <Form consent={user.consent} />
      </div>
    </div>
  );
};

export default App;
