import { DefaultButton, Separator, Stack } from "@fluentui/react";
import { FC } from "react";
import { useHistory } from "react-router-dom";
import { updateEmployee } from "../../api/employee.api";
import { privacyStatementHtml } from "../../const/strings";
import { IAppState, useSharedState } from "../../context/App.context";

import "./privacyStatemen.style.css";

interface IPrivacyStatementProps {
  hideModal: () => void;
}

export const PrivacyStatement: FC<IPrivacyStatementProps> = ({ hideModal }) => {
  const [sharedState, setSharedState] = useSharedState();

  const history = useHistory();

  const onAgree = async (): Promise<void> => {
    const updatedState = {
      ...sharedState,
      employee: { ...sharedState.employee },
    } as IAppState;

    try {
      updatedState.employee.privacyStatementConsent = true;
      await updateEmployee(updatedState.employee);
      setSharedState(() => updatedState);
      hideModal();

      history.push("/vaccination");
    } catch (error) {
      hideModal();
    }
  };

  return (
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
};
