import {
  MessageBar,
  PrimaryButton,
  DefaultButton,
  Spinner,
  SpinnerSize,
  Stack,
  TextField,
  ActionButton,
  MessageBarType,
} from "@fluentui/react";
import { FC } from "react";
import { useAction } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ErrorKeyEnum } from "../../models/IError";
import { composeMobile } from "../../utils/compose";
import { icon } from "../../utils/iconsUtil";

export interface IVerificationProps {
  inputValue: string;
  onChange: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => void;
}

export const Verification: FC<IVerificationProps> = ({
  onChange,
  inputValue,
}) => {
  const { isLoading, verification, employee, error } = useTypedSelector(
    (state) => state.auth
  );
  const {
    sendVarificationCode,
    setVarification,
    setAuthError,
    setIsAuth,
    cancelVerification,
  } = useAction();

  const onSendVerificationHandler = () => {
    sendVarificationCode(employee);
  };

  const verifyCode = (): void => {
    if (verification.code === inputValue) {
      if (employee.privacyStatementConsent) {
        setVarification({ ...verification, passed: true });
        setIsAuth(true);
      } else {
        setVarification({ ...verification, passed: true });
      }
    } else {
      setAuthError({ [ErrorKeyEnum.INPUT_CODE]: "Code is not correct" });
    }
  };

  return (
    <>
      {employee.id !== 0 && !verification.isSent && (
        <>
          {error && error[ErrorKeyEnum.SEND_CODE] ? (
            <MessageBar messageBarType={MessageBarType.error}>
              {error[ErrorKeyEnum.SEND_CODE]}
            </MessageBar>
          ) : (
            <MessageBar>
              {employee.mobile
                ? composeMobile(employee.mobile)
                : employee.email}
            </MessageBar>
          )}

          <Stack horizontal tokens={{ childrenGap: 10 }}>
            <ActionButton
              onClick={onSendVerificationHandler}
              iconProps={icon.send}
              allowDisabledFocus
              styles={{
                label: { fontSize: 14, fontWeight: 600 },
                icon: { fontSize: 20 },
              }}
            >
              Send verification code
            </ActionButton>

            {isLoading && <Spinner size={SpinnerSize.large} />}
          </Stack>
        </>
      )}

      {employee.id !== 0 && verification.isSent && !verification.passed && (
        <>
          <MessageBar isMultiline>
            We have sent a verification code. Please enter it to sign in
          </MessageBar>
          <TextField
            id="verificationCode"
            label="Code:"
            required
            disabled={false}
            placeholder="Enter here"
            value={inputValue}
            onChange={onChange}
            errorMessage={error ? error[ErrorKeyEnum.INPUT_CODE] : ""}
          />
          <Stack horizontal tokens={{ childrenGap: 20 }}>
            <DefaultButton text="Cancel" onClick={cancelVerification} />
            <PrimaryButton
              text="Verify"
              disabled={!inputValue}
              onClick={verifyCode}
            />
          </Stack>
        </>
      )}
    </>
  );
};
