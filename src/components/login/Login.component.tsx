import { Label, MessageBarType, Stack, DefaultButton } from "@fluentui/react";
import { useEffect, useState, FC, useCallback, memo } from "react";
import { useHistory, Link as RouterLink } from "react-router-dom";
import { getEmployeeWithQuery } from "../../api/employee.api";
import { sendVerificationCode } from "../../api/verification-code.api";
import { useSharedState } from "../../context/App.context";
import { TextInputControl } from "../../controls/TextInput.component";
import { codeGenerator } from "../../utils/codeGenerator";
import { composeEmail } from "../../utils/composeEmail";
import { EmployeeConsent } from "../consent/Consent.component";
import { MessageBarContainer } from "../message/Message.component";
import { Verification } from "../verification/Verification.component";

import "./login.css";
const formBodyStack = {
  root: { width: "70%", paddingLeft: 20, minHeight: 300 },
};

export interface ILogin {
  firstName: string;
  lastName: string;
  employeeNumber: string;
  verificationCode: string;
}

const initLoginState = {
  firstName: "",
  lastName: "",
  employeeNumber: "",
  verificationCode: "",
};

export const Login: FC = memo(() => {
  const [sharedState, setSharedState] = useSharedState();
  const [login, setLogin] = useState<ILogin>(() => initLoginState);
  const history = useHistory();

  const onInputChange = (id: string, value: string) => {
    setLogin({ ...login, [id]: value });
  };

  const onVerificationCodeInput = useCallback(() => {
    if (
      sharedState.sentVerificationCode &&
      login.verificationCode &&
      login.verificationCode === sharedState.sentVerificationCode
    ) {
      setSharedState((prev) => {
        const newSharedState = { ...prev };

        if (newSharedState.error && newSharedState.error["wrongCode"]) {
          delete newSharedState.error["wrongCode"];
        }
        newSharedState.verificationPassed = true;
        return newSharedState;
      });
    } else if (
      sharedState.sentVerificationCode &&
      login.verificationCode &&
      login.verificationCode !== sharedState.sentVerificationCode
    ) {
      setSharedState((prev) => ({
        ...prev,
        error: { wrongCode: "Code is incorrect" },
      }));
    }
  }, [
    sharedState.sentVerificationCode,
    login.verificationCode,
    setSharedState,
  ]);

  const onSendCodeClick = async () => {
    // e.preventDefault();

    try {
      const employee = await getEmployeeWithQuery(login);

      if (employee) {
        const code = codeGenerator();
        const email = composeEmail(employee.email, code);
        await sendVerificationCode(email);

        setSharedState((prev) => ({
          ...prev,
          sentVerificationCode: code,
          employee,
        }));
      } else {
        setSharedState((prev) => ({
          ...prev,
          error: {
            employeeFound: "Sorry, no employee found with the given input",
          },
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isInputDisabled = (): boolean =>
    sharedState.verificationPassed ||
    !!sharedState.error ||
    !!sharedState.sentVerificationCode;

  useEffect(() => {
    onVerificationCodeInput();
  }, [
    login.verificationCode,
    sharedState.sentVerificationCode,
    onVerificationCodeInput,
  ]);

  useEffect(() => {
    if (
      sharedState.employee.privacyStatementConsent &&
      sharedState.verificationPassed
    ) {
      history.push("/vaccination");
    }
  }, [
    history,
    sharedState.verificationPassed,
    sharedState.employee.privacyStatementConsent,
  ]);

  return (
    <div className="login-container">
      <form className="formBody">
        <Stack verticalAlign="center" styles={formBodyStack}>
          <TextInputControl
            id="firstName"
            label="First name"
            value={login.firstName}
            onChange={onInputChange}
            required
            disabled={isInputDisabled()}
          />
          <TextInputControl
            id="lastName"
            label="Last name"
            value={login.lastName}
            onChange={onInputChange}
            required
            disabled={isInputDisabled()}
          />
          <TextInputControl
            id="employeeNumber"
            label="Employee number"
            value={login.employeeNumber}
            onChange={onInputChange}
            required
            disabled={isInputDisabled()}
          />
          {sharedState.error && sharedState.error["employeeFound"] && (
            <MessageBarContainer
              messageType={MessageBarType.error}
              onDismiss={() =>
                setSharedState((prev) => ({
                  ...prev,
                  error: null,
                }))
              }
            >
              <Stack verticalAlign="center">
                <Label>{sharedState.error["employeeFound"]}</Label>
              </Stack>
            </MessageBarContainer>
          )}
        </Stack>

        <Verification
          codeInput={login.verificationCode}
          login={login}
          onInputChange={onInputChange}
          onSendCode={onSendCodeClick}
        />
        <EmployeeConsent />
        {/* <RouterLink to="/vaccination">
          <DefaultButton
            text="Continue"
            allowDisabledFocus
            disabled={false}
            styles={{ root: { marginLeft: 20 } }}
          />
        </RouterLink> */}
        <RouterLink to="/vaccination">
          <DefaultButton text="Go to vac 8 form" />
        </RouterLink>
      </form>
    </div>
  );
});
