import { PrimaryButton, Spinner, SpinnerSize, Stack } from "@fluentui/react";
import { FC } from "react";
import { useSharedState } from "../../context/App.context";
import { TextInputControl } from "../../controls/TextInput.component";
import { ILogin } from "../login/Login.component";
import { textInputControlStyle } from "./VerificationStylesObjects";

export interface IVerificationProps {
  codeInput: string | undefined;
  login: ILogin;
  onInputChange: (id: string, value: string) => void;
  onSendCode: () => void;
}

export const Verification: FC<IVerificationProps> = ({
  codeInput,
  onInputChange,
  onSendCode,
  login,
}) => {
  const [sharedState] = useSharedState();

  const isDisabled = (): boolean => {
    const { firstName, lastName, employeeNumber } = login;
    return !!(
      !firstName ||
      !lastName ||
      !employeeNumber ||
      sharedState.error ||
      sharedState.loading
    );
  };

  return (
    <>
      {sharedState.sentVerificationCode && (
        <TextInputControl
          id="verificationCode"
          label="Code:"
          value={codeInput}
          onChange={onInputChange}
          required
          disabled={sharedState.verificationPassed}
          placeholder="Enter here"
          styles={textInputControlStyle}
          underlined
          errorMessage={sharedState.error ? sharedState.error["wrongCode"] : ""}
        />
      )}
      {!sharedState.verificationPassed && !sharedState.sentVerificationCode && (
        <Stack
          horizontal
          horizontalAlign="start"
          tokens={{ childrenGap: 5 }}
          styles={{ root: { marginLeft: 20 } }}
        >
          <PrimaryButton
            text="Get verification code"
            onClick={onSendCode}
            disabled={isDisabled()}
          />
          {sharedState.loading && <Spinner size={SpinnerSize.large} />}
        </Stack>
      )}
    </>
  );
};
