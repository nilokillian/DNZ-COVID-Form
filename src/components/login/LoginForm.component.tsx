import {
  MessageBarType,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  Stack,
  TextField,
  Text,
  MessageBar,
  Separator,
  Link,
  AnimationStyles,
} from "@fluentui/react";
import { useState, FC, useCallback, memo } from "react";
import { EmployeeConsent } from "../consent/Consent.component";
import { Verification } from "../verification/Verification.component";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useAction } from "../../hooks/useAction";
import { ILoginForm } from "../../models/ILoginForm";
import { isDisabled } from "../../utils/isDisabledField";
import { ErrorKeyEnum } from "../../models/IError";
const formBodyStack = {
  root: { width: "70%", minHeight: 300 },
};

const initLoginState = {
  firstName: "",
  lastName: "",
  employeeNumber: "",
  verificationCode: "",
};

export const LoginForm: FC = memo(() => {
  const { login, setAuthError } = useAction();
  const [loginForm, setLoginForm] = useState<ILoginForm>(() => initLoginState);

  const onInputChange = useCallback(
    (
      e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string
    ) => {
      const inputId = (e.target as HTMLInputElement).id;

      setLoginForm({ ...loginForm, [inputId]: newValue });
    },
    [setLoginForm, loginForm]
  );

  const { isLoading, employee, error, verification, isAuth } = useTypedSelector(
    (state) => state.auth
  );
  const onLoginHadler = () => {
    // e.preventDefault();

    const { firstName, lastName, employeeNumber } = loginForm;

    login(firstName, lastName, employeeNumber);
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <Stack
          verticalAlign="center"
          styles={formBodyStack}
          tokens={{ childrenGap: 10 }}
        >
          <TextField
            id="firstName"
            label="Legal first name"
            required
            disabled={!!employee.id}
            value={loginForm.firstName}
            onChange={onInputChange}
          />
          <TextField
            id="lastName"
            label="Last name"
            required
            disabled={!!employee.id}
            value={loginForm.lastName}
            onChange={onInputChange}
          />

          <TextField
            id="employeeNumber"
            label="Employee number"
            required
            value={loginForm.employeeNumber}
            onChange={onInputChange}
            disabled={!!employee.id}
          />

          <Separator />
          {error &&
            (error[ErrorKeyEnum.EMPLOYEE_NOT_FOUND] ||
              error[ErrorKeyEnum.GET_EMPLOYEE]) && (
              <MessageBar
                messageBarType={MessageBarType.error}
                onDismiss={() => setAuthError(null)}
                styles={{
                  content: {
                    alignItems: "center",
                    justifyContent: "center",
                  },
                }}
              >
                <Stack verticalAlign="center">
                  <Text variant="small">
                    {error[ErrorKeyEnum.EMPLOYEE_NOT_FOUND] ||
                      error[ErrorKeyEnum.GET_EMPLOYEE]}
                  </Text>
                </Stack>
              </MessageBar>
            )}
          {!employee.id && (
            <Stack horizontal tokens={{ childrenGap: 10 }}>
              <PrimaryButton
                text="Login"
                onClick={onLoginHadler}
                disabled={isDisabled([
                  loginForm.firstName,
                  loginForm.lastName,
                  loginForm.employeeNumber,
                  !isLoading,
                ])}
                styles={{
                  root: { minWidth: 220, ...AnimationStyles.fadeIn400 },
                }}
              />
              {isLoading && <Spinner size={SpinnerSize.large} />}
            </Stack>
          )}

          <Verification
            inputValue={loginForm.verificationCode}
            onChange={onInputChange}
          />
        </Stack>

        {!isAuth &&
          verification.passed &&
          !employee.privacyStatementConsent && <EmployeeConsent />}
        <Stack horizontal horizontalAlign="end">
          <Link
            href="mailto:VAXn8@downergroup.com?subject=Vax8 app help"
            styles={{ root: { textDecoration: "none", fontSize: 14 } }}
          >
            @ Need help ?
          </Link>
        </Stack>
      </form>
    </div>
  );
});
