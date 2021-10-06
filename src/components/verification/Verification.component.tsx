import {
  MessageBar,
  PrimaryButton,
  DefaultButton,
  Stack,
  TextField,
} from "@fluentui/react";
import { FC } from "react";
import { useAction } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ErrorKeyEnum } from "../../models/IError";
import { IVerificationProps } from "../../models/IVerificationProps";
import {
  cancelBtnStyle,
  verificationCodeOnputStyle,
  verificationMessageBarStyle,
  verifyBtnStyle,
} from "./VerificationStylesObjects";

export const Verification: FC<IVerificationProps> = ({
  onChange,
  inputValue,
}) => {
  const { isLoading, verificationCodeSent, token, employee, error } =
    useTypedSelector((state) => state.auth);
  const { getToken, cancelVerification } = useAction();

  const verifyCode = () => {
    if (employee) {
      getToken(Number(inputValue), employee);
    }
  };

  const onCancelHandler = (e: any) => {
    e.target.id = "verificationCode";
    onChange(e, "");
    cancelVerification();
  };

  return (
    <>
      {verificationCodeSent && !token && (
        <>
          <MessageBar isMultiline styles={verificationMessageBarStyle}>
            We have sent a verification code. Please enter it to sign in{" "}
            &#10;&#13;
            {employee && employee.mobile
              ? employee.mobile
              : employee && employee.email}
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
            styles={verificationCodeOnputStyle}
          />
          <Stack horizontal tokens={{ childrenGap: 20 }}>
            <DefaultButton
              text="Cancel"
              onClick={(e) => onCancelHandler(e)}
              styles={cancelBtnStyle}
              disabled={isLoading}
            />
            <PrimaryButton
              text="Verify"
              disabled={!inputValue || isLoading}
              onClick={verifyCode}
              styles={verifyBtnStyle}
            />
          </Stack>
        </>
      )}
    </>
  );
};
