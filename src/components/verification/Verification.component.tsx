import {
  MessageBar,
  PrimaryButton,
  DefaultButton,
  Stack,
  TextField,
  AnimationStyles,
} from "@fluentui/react";
import { FC } from "react";
import { useAction } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ErrorKeyEnum } from "../../models/IError";
import { IVerificationProps } from "../../models/IVerificationProps";
// import { sendVerificationCodeStyle } from "./VerificationStylesObjects";

export const Verification: FC<IVerificationProps> = ({
  onChange,
  inputValue,
}) => {
  const { isLoading, verificationCodeSent, employee, error } = useTypedSelector(
    (state) => state.auth
  );
  const { getToken, cancelVerification } = useAction();

  const verifyCode = () => {
    getToken(Number(inputValue), employee);
  };

  const onCancelHandler = (e: any) => {
    e.target.id = "verificationCode";
    onChange(e, "");
    cancelVerification();
  };

  return (
    <>
      {verificationCodeSent && (
        <>
          <MessageBar
            isMultiline
            styles={{
              root: { ...AnimationStyles.fadeIn500, whiteSpace: "pre-line" },
            }}
          >
            We have sent a verification code. Please enter it to sign in{" "}
            &#10;&#13;
            {employee.mobile ? employee.mobile : employee.email}
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
              onClick={(e) => onCancelHandler(e)}
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
