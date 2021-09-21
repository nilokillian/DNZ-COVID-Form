import { DefaultButton, Separator, Stack } from "@fluentui/react";
import { FC } from "react";
import { privacyStatementHtml } from "../../const/strings";
import "./privacyStatemen.style.css";

interface IPrivacyStatementProps {
  hideModal: () => void;
  onAgree: () => void;
}

export const PrivacyStatement: FC<IPrivacyStatementProps> = ({
  hideModal,
  onAgree,
}) => (
  <div className="privacy-statement-container">
    <Separator />
    <div
      className="privacy-statement-content"
      dangerouslySetInnerHTML={{ __html: privacyStatementHtml }}
    />
    <Separator />
    <Stack horizontal horizontalAlign="space-around" wrap>
      <DefaultButton
        text="I need to think about"
        styles={{ root: { minWidth: 150, marginBottom: 20 } }}
        onClick={hideModal}
      />

      <DefaultButton
        text="I confirm that I have read the privacy policy"
        styles={{ root: { minWidth: 150 } }}
        onClick={onAgree}
      />
    </Stack>
  </div>
);
