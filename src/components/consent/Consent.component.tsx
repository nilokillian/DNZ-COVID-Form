import { FC } from "react";
import { DefaultButton, MessageBarType } from "@fluentui/react";
import { MessageBarContainer } from "../message/Message.component";

import "./consent.css";

interface IUserConsentprops {
  messageType: MessageBarType;
  text: string;
  consent: boolean;
  onChange: () => void;
}

export const UserConsent: FC<IUserConsentprops> = ({
  messageType,
  text,
  consent,
  onChange,
}) => {
  return (
    <div className="userConsent">
      <MessageBarContainer messageType={messageType} text={text} />

      <div className="user-consent-btn">
        <DefaultButton text="Continue" onClick={onChange} allowDisabledFocus />
      </div>
    </div>
  );
};
