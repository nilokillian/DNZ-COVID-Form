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
  AnimationStyles,
} from "@fluentui/react";
import { FC } from "react";
import { useAction } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ErrorKeyEnum } from "../../models/IError";
import { IVerificationProps } from "../../models/IVerificationProps";
import { composeMobile } from "../../utils/compose";
import { icon } from "../../utils/iconsUtil";
import { sendVerificationCodeStyle } from "./VerificationStylesObjects";

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

  const onSendVerificationHandler = (): void => {
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
      {!employee.id && !verification.isSent && (
        <>
          {error && error[ErrorKeyEnum.SEND_CODE] ? (
            <MessageBar messageBarType={MessageBarType.error}>
              {error[ErrorKeyEnum.SEND_CODE]}
            </MessageBar>
          ) : (
            <MessageBar styles={{ root: { ...AnimationStyles.fadeIn400 } }}>
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
              styles={sendVerificationCodeStyle}
            >
              Send verification code
            </ActionButton>
            {isLoading && <Spinner size={SpinnerSize.large} />}
          </Stack>
        </>
      )}

      {employee.id && verification.isSent && !verification.passed && (
        <>
          <MessageBar
            isMultiline
            styles={{ root: { ...AnimationStyles.fadeIn500 } }}
          >
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
            styles={{ root: { ...AnimationStyles.slideRightIn400 } }}
          />
          <Stack horizontal tokens={{ childrenGap: 20 }}>
            <DefaultButton
              text="Cancel"
              onClick={cancelVerification}
              styles={{ root: { ...AnimationStyles.slideRightIn400 } }}
            />
            <PrimaryButton
              text="Verify"
              disabled={!inputValue}
              onClick={verifyCode}
              styles={{ root: { ...AnimationStyles.slideRightIn400 } }}
            />
          </Stack>
        </>
      )}
    </>
  );
};
