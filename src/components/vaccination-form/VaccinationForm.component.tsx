import { FC, useCallback, useEffect, useState } from "react";
import {
  Label,
  PrimaryButton,
  Stack,
  Separator,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  Text,
} from "@fluentui/react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { CalendarInput } from "../../controls/calendar/CalendarInput.component";
import { ShotsSelection } from "../ShotsSelection.component";
import { FileInput } from "../../controls/file-input/FileInput";
import { EmployeeCard } from "../employee-card/EmployeeCard";
import {
  submitFromBtnStyle,
  vaccinationFormContainerStyle,
} from "./VaccinationFormStyledObjects";
import { DisplayAttachment } from "../display-attachment/DisplayAttachment.component";
import { allActionCreators } from "../../store/reducers/action-creators";
import { ShotsOptionsEnum } from "../../models/IShotsSelection";
import { VaccinationFormModeEnum } from "../../store/reducers/vaccination/types";
import { IVaccinationFormState } from "../../models/IVerification";
import VaccinationService from "../../api/vaccination.service";
import { ErrorKeyEnum } from "../../models/IError";

import "./form.css";

export const VaccinationForm: FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const {
    vaccination: { isLoading, formMode, error },
    auth: { employee },
  } = useTypedSelector((state) => state);

  const [formInputs, setFormInputs] = useState<IVaccinationFormState>({
    shot: ShotsOptionsEnum.ZERO,
    employeeId: employee.id!,
    firstShotDate: null,
    seconShotDate: null,
    boosterDate: null,
    comment: "",
    attachments: [],
  });

  const submitForm = async (e: any) => {
    e.preventDefault();
    dispatch(allActionCreators.setVaccinationLoading(true));

    try {
      if (formMode === VaccinationFormModeEnum.NEW) {
        await VaccinationService.createVaccination(formInputs);
      } else {
        await VaccinationService.updateVaccination(formInputs.id!, formInputs);
      }
    } catch (error) {
      dispatch(
        allActionCreators.setVaccinationError({
          [formMode === VaccinationFormModeEnum.NEW
            ? ErrorKeyEnum.CREATE_VACCINATION
            : ErrorKeyEnum.UPDATE_VACCINATION]: `${
            formMode === VaccinationFormModeEnum.NEW ? "Creating " : "Updating "
          }vaccination record failed`,
        })
      );
      console.log(error);
    }
    dispatch(allActionCreators.setVaccinationLoading(false));
  };

  const onInputChange = (id: string, value: any) => {
    setFormInputs({ ...formInputs, [id]: value });
  };

  const onDateChange = (id: string, value: Date) => {
    setFormInputs({ ...formInputs, [id]: value });
  };

  const onAttachmentChange = (name: string, file: string) => {
    setFormInputs((prev) => ({
      ...prev,
      attachments: [...prev.attachments, { name, file }],
    }));
  };

  const onAttachmentRemove = (name: string) => {
    setFormInputs((prev) => ({
      ...prev,
      attachment: [...prev.attachments.filter((att) => att.name !== name)],
    }));
  };

  const getVaccination = useCallback(async () => {
    dispatch(allActionCreators.setVaccinationLoading(true));
    try {
      const response = await VaccinationService.getEmployeeVaccination(
        employee.id!
      );
      if (response.data) {
        const vaccination = response.data;
        dispatch(allActionCreators.setFormMode(VaccinationFormModeEnum.EDIT));
        setFormInputs(vaccination);
      } else {
        dispatch(allActionCreators.setFormMode(VaccinationFormModeEnum.NEW));
      }
    } catch (error) {
      dispatch(
        allActionCreators.setVaccinationError({
          [ErrorKeyEnum.GET_VACCINATION]: "Getting vaccination record failed",
        })
      );
      console.log(error);
    }

    dispatch(allActionCreators.setVaccinationLoading(false));
  }, [dispatch, employee.id]);

  useEffect(() => {
    getVaccination();
  }, [getVaccination]);

  // useEffect(() => {
  //   if (employee.privacyStatementConsent && verification.passed)
  //     if (!isAuth) {
  //       dispatch(allActionCreators.setIsAuth(true));
  //     }
  // }, [
  //   employee.privacyStatementConsent,
  //   verification.isSent,
  //   verification.passed,
  //   isAuth,
  //   dispatch,
  // ]);

  return (
    <form className="formBody" onSubmit={submitForm}>
      <Stack verticalAlign="start" styles={vaccinationFormContainerStyle}>
        <EmployeeCard />
        <Separator />
        <ShotsSelection
          id="shot"
          label="How many shots do you have ?"
          value={formInputs.shot}
          onChange={onInputChange}
          disabled={isLoading}
        />
        {formInputs.shot === ShotsOptionsEnum.ONE && (
          <CalendarInput
            id="firstShotDate"
            value={
              formInputs.firstShotDate ? formInputs.firstShotDate : new Date()
            }
            onChange={onDateChange}
            label="First vaccine date"
            required
          />
        )}

        {formInputs.shot === ShotsOptionsEnum.TWO && (
          <CalendarInput
            id="seconShotDate"
            value={
              formInputs.seconShotDate ? formInputs.seconShotDate : new Date()
            }
            onChange={onDateChange}
            label="Second vaccine date"
            required
          />
        )}
        {formInputs.shot === ShotsOptionsEnum.BOOSTER && (
          <CalendarInput
            id="boosterDate"
            value={formInputs.boosterDate ? formInputs.boosterDate : new Date()}
            onChange={onDateChange}
            label="Booster date"
            required
          />
        )}
        <Label>
          Free text / to enter vaccine info (Pfizer, Astrazeneca etc)
        </Label>
        <textarea
          id="comment"
          cols={40}
          rows={5}
          value={formInputs.comment}
          onChange={(e) => onInputChange("comment", e.target.value)}
          disabled={isLoading}
          style={{ marginLeft: 1 }}
        />
        <Separator />

        <FileInput
          id="attachments"
          inputLabel="Add attachments (vaccine certificate, cards, medical exemption certificates etc)"
          onChange={onAttachmentChange}
          name="attachments"
          disabled={isLoading}
        />
        <DisplayAttachment
          data={formInputs.attachments}
          onRemove={onAttachmentRemove}
        />
        <Separator />
        {error && (
          <MessageBar
            messageBarType={MessageBarType.error}
            onDismiss={() =>
              dispatch(allActionCreators.setVaccinationError(null))
            }
            styles={{
              root: { marginBottom: 20 },
              content: {
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          >
            <Stack verticalAlign="center">
              <Text variant="small">
                {error[ErrorKeyEnum.CREATE_VACCINATION] ||
                  error[ErrorKeyEnum.UPDATE_VACCINATION] ||
                  error[ErrorKeyEnum.GET_VACCINATION]}
              </Text>
            </Stack>
          </MessageBar>
        )}

        <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 5 }}>
          <PrimaryButton
            text={isLoading ? "Submitting" : "Submit"}
            disabled={isLoading}
            onClick={submitForm}
            styles={submitFromBtnStyle}
          />
          {isLoading && <Spinner size={SpinnerSize.large} />}
        </Stack>
        <div style={{ marginBottom: 30 }}></div>
      </Stack>
    </form>
  );
};
