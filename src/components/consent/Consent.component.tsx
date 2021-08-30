import { FC, useState } from "react";
import {
  DefaultButton,
  Link,
  MessageBarType,
  Separator,
  Text,
} from "@fluentui/react";
import { MessageBarContainer } from "../message/Message.component";

import "./consent.css";
import { ModalWindow } from "../modal/Modal.component";
import { privacyHeader, privacyStatementHtml } from "../../const/strings";

interface IUserConsentprops {
  messageType: MessageBarType;
  consent: boolean;
  privacyStatementAgreed: boolean;
  onConsent: () => void;
  onPrivacyAgree: () => void;
}

export const UserConsent: FC<IUserConsentprops> = ({
  messageType,
  onConsent,
  onPrivacyAgree,
  privacyStatementAgreed,
}) => {
  const [privacyWindow, setPrivacyWindow] = useState<boolean>(false);
  return (
    <div className="userConsent">
      <MessageBarContainer messageType={messageType}>
        <div>
          <Text>
            <h5>{privacyHeader}</h5>

            <h5>
              The information that we will collect, and how we will use, handle
              and store it.{" "}
            </h5>
            <h5>
              {" "}
              <Link onClick={() => setPrivacyWindow(true)} underline>
                {" "}
                Read Privacy Statement
              </Link>
            </h5>
            {privacyStatementAgreed ? (
              ""
            ) : (
              <h6>
                {" "}
                In order to continue you need to consent to our collection, use
                and handling of your personal information
              </h6>
            )}
          </Text>
        </div>
      </MessageBarContainer>

      <ModalWindow
        isBlocking={!privacyStatementAgreed}
        isModalOpen={privacyWindow}
        hideModal={() => setPrivacyWindow(false)}
      >
        <div
          dangerouslySetInnerHTML={{ __html: privacyStatementHtml }}
          style={{ textAlign: "left", maxWidth: 500 }}
        ></div>
        <Separator />
        <div style={{ height: 50 }}>
          <DefaultButton
            required={!privacyStatementAgreed}
            text={
              privacyStatementAgreed
                ? "Back"
                : "I confirm that I have read the privacy policy"
            }
            onClick={() => {
              setPrivacyWindow(false);
              if (!privacyStatementAgreed) onPrivacyAgree();
            }}
          />
        </div>
      </ModalWindow>

      <div className="user-consent-btn">
        <DefaultButton
          text="Continue"
          onClick={onConsent}
          allowDisabledFocus
          disabled={!privacyStatementAgreed}
        />
        <p></p>
      </div>
    </div>
  );
};
