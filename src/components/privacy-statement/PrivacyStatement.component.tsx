import { DefaultButton, Separator, Stack } from "@fluentui/react";
import { FC } from "react";
import {
  privacyStatementHtmlAU,
  privacyStatementHtmlNZ,
} from "../../const/strings";
import "./privacyStatemen.style.css";

interface IPrivacyStatementProps {
  hideModal: () => void;
  onAgree: () => void;
  country: string;
}

export const PrivacyStatement: FC<IPrivacyStatementProps> = ({
  hideModal,
  onAgree,
  country,
}) => {
  const getPrivacyStatementHtml = () => {
    if (country === "AU") {
      return privacyStatementHtmlAU;
    } else if (country === "NZ") {
      return privacyStatementHtmlNZ;
    } else {
      return "";
    }
  };

  return (
    <div className="privacy-statement-container">
      <Separator />
      <div
        className="privacy-statement-content"
        dangerouslySetInnerHTML={{ __html: getPrivacyStatementHtml() }}
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
};
