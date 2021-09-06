import { FC, useState } from "react";
import { MessageBarType, Text, Link } from "@fluentui/react";
import { MessageBarContainer } from "../message/Message.component";
import { privacyHeader } from "../../const/strings";
import { useSharedState } from "../../context/App.context";
import { ModalWindow } from "../modal/Modal.component";
import { PrivacyStatement } from "../privacy-statement/PrivacyStatement.component";
import "./consent.css";

export const EmployeeConsent: FC = () => {
  const [privacyStatementModal, setPrivacyStatementModal] = useState(false);

  const [sharedState] = useSharedState();

  return (
    <div className="consent-container">
      {sharedState.verificationPassed &&
        !sharedState.employee.privacyStatementConsent && (
          <MessageBarContainer messageType={MessageBarType.info}>
            <div>
              <Text variant="smallPlus">
                {privacyHeader} The information that we will collect, and how we
                will use, handle and store it.
              </Text>
              <p />
              <Text variant="smallPlus">
                In order to continue you need to consent to our collection, use
                and handling of your personal information
              </Text>
              <p />
              <Link
                onClick={() => setPrivacyStatementModal(true)}
                underline
                styles={{ root: { fontSize: 14 } }}
              >
                Read Privacy Statement
              </Link>
            </div>
          </MessageBarContainer>
        )}

      <ModalWindow
        hideModal={() => setPrivacyStatementModal(false)}
        isModalOpen={privacyStatementModal}
      >
        <PrivacyStatement hideModal={() => setPrivacyStatementModal(false)} />
      </ModalWindow>
    </div>
  );
};
