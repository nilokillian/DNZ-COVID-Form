import { FC, useEffect, useState } from "react";
import { MessageBarType, Text, Link, MessageBar } from "@fluentui/react";
import { privacyHeaderAU, privacyHeaderNZ } from "../../const/strings";
import { ModalWindow } from "../modal/Modal.component";
import { PrivacyStatement } from "../privacy-statement/PrivacyStatement.component";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { allActionCreators } from "../../store/reducers/action-creators";
import { IEmployee } from "../../models/IEmployee";
import EmployeeService from "../../api/employee.service";
import {
  privacyStatementLinkStyle,
  privacyStatementMessageBarStyle,
} from "./consentStyledObjects";

import "./consent.css";

export const EmployeeConsent: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { employee, token } = useTypedSelector((state) => state.auth);
  const [privacyStatementModal, setPrivacyStatementModal] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);

  useEffect(() => {
    if (privacyConsent) {
      dispatch(allActionCreators.setAuthLoading(true));

      const updateEmployee: Partial<IEmployee> = {
        privacyStatementConsent: true,
      };

      if (employee)
        EmployeeService.updateEmployeeConsent(
          employee.id,
          updateEmployee,
          token
        )
          .then(() => {
            dispatch(
              allActionCreators.setEmployee({
                ...employee,
                privacyStatementConsent: true,
              })
            );
            dispatch(allActionCreators.setAuthLoading(false));
            dispatch(allActionCreators.setIsAuth(true));
          })
          .catch(() => console.log("error"));
    }
  }, [privacyConsent, dispatch, employee]);

  return (
    <div className="consent-container">
      <MessageBar
        isMultiline
        messageBarType={MessageBarType.info}
        styles={privacyStatementMessageBarStyle}
      >
        <div>
          <Text variant="smallPlus">
            {employee && employee.country === "AU"
              ? privacyHeaderAU
              : privacyHeaderNZ}{" "}
            The information that we will collect, and how we will use, handle
            and store it.
          </Text>
          <p />
          <Text variant="smallPlus">
            In order to continue you need to consent to our collection, use and
            handling of your personal information
          </Text>
          <p />
          <Link
            onClick={() => setPrivacyStatementModal(true)}
            underline
            styles={privacyStatementLinkStyle}
          >
            Read Privacy Statement
          </Link>
        </div>
      </MessageBar>

      <ModalWindow
        hideModal={() => setPrivacyStatementModal(false)}
        isModalOpen={privacyStatementModal}
        isBlocking={true}
      >
        <PrivacyStatement
          country={employee && employee.country ? employee.country : ""}
          onAgree={() => {
            setPrivacyStatementModal(false);
            setPrivacyConsent(true);
          }}
          hideModal={() => setPrivacyStatementModal(false)}
        />
      </ModalWindow>
    </div>
  );
};
