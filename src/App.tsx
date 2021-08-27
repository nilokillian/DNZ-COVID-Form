import { useState, useEffect } from "react";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { Form } from "./components/form/Form.component";
import Header from "./components/header/Header.component";
import { UserConsent } from "./components/consent/Consent.component";
import { headerTitle } from "./const/strings";
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
  const [privacyStatementAgreed, setPrivacyStatementAgreed] =
    useState<boolean>(false);

  useEffect(() => {
    //API call to set user
  }, []);

  return (
    <div className="App">
      <div className="container">
        <Header title={headerTitle} />
        {!user.consent && (
          <UserConsent
            messageType={MessageBarType.info}
            onConsent={() => {
              setUser((prev) => ({ ...prev, consent: true }));
            }}
            onPrivacyAgree={() => setPrivacyStatementAgreed(true)}
            privacyStatementAgreed={privacyStatementAgreed}
            consent={true}
          />
        )}
        <Form consent={user.consent} />
      </div>
    </div>
  );
};

export default App;
