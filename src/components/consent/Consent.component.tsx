import { FC, useEffect, useState } from "react";
import { MessageBarType, Text, Link } from "@fluentui/react";
import { MessageBarContainer } from "../message/Message.component";
import { privacyHeader } from "../../const/strings";
import { ModalWindow } from "../modal/Modal.component";
import { PrivacyStatement } from "../privacy-statement/PrivacyStatement.component";
import "./consent.css";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { allActionCreators } from "../../store/reducers/action-creators";
import { IEmployee } from "../../models/IEmployee";
import EmployeeService from "../../api/employee.service";

export const EmployeeConsent: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const { employee } = useTypedSelector((state) => state.auth);
  const [privacyStatementModal, setPrivacyStatementModal] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);

  useEffect(() => {
    if (privacyConsent) {
      dispatch(allActionCreators.setAuthLoading(true));

      const updateEmployee: IEmployee = {
        ...employee,
        privacyStatementConsent: true,
      };

      delete updateEmployee.id;

      EmployeeService.updateEmployee(employee.id!, updateEmployee)
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
      <MessageBarContainer messageType={MessageBarType.info}>
        <div>
          <Text variant="smallPlus">
            {privacyHeader} The information that we will collect, and how we
            will use, handle and store it.
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
            styles={{ root: { fontSize: 14 } }}
          >
            Read Privacy Statement
          </Link>
        </div>
      </MessageBarContainer>

      <ModalWindow
        hideModal={() => setPrivacyStatementModal(false)}
        isModalOpen={privacyStatementModal}
        isBlocking={true}
      >
        <PrivacyStatement
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
