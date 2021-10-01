import { FC, useEffect, useState } from "react";
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
import { VaccinateStatusSelection } from "../VaccinateStatusSelection.component";
import { FileInput } from "../../controls/file-input/FileInput";
import { EmployeeCard } from "../employee-card/EmployeeCard";
import {
  errorMessageBarStyle,
  submitFromBtnStyle,
  vaccinationFormContainerStyle,
} from "./VaccinationFormStyledObjects";
import { DisplayAttachment } from "../display-attachment/DisplayAttachment.component";
import { allActionCreators } from "../../store/reducers/action-creators";
import {
  IVaccinationRecord,
  ShotsOptionsEnum,
  VaccinationFormModeEnum,
} from "../../store/reducers/vaccination/types";
import VaccinationService from "../../api/vaccination.service";
import { ErrorKeyEnum } from "../../models/IError";
import { VaccinationFormState } from "../../models/IVaccinationFormState";
import { useHistory } from "react-router-dom";
import { RouteNames } from "../../routes";

export const VaccinationForm: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    vaccination: { isLoading, formMode, error, vaccinationRecord },
    auth: { employee, token },
  } = useTypedSelector((state) => state);

  const [formInputs, setFormInputs] = useState<VaccinationFormState>({
    shot: ShotsOptionsEnum.ZERO,
    employeeId: employee.id,
    firstShotDate: null,
    secondShotDate: null,
    boosterDate: null,
    comment: "",
    attachments: [],
  });

  const submitForm = async (e: any) => {
    e.preventDefault();
    dispatch(allActionCreators.setVaccinationLoading(true));

    try {
      if (formMode === VaccinationFormModeEnum.NEW) {
        await VaccinationService.createVaccination(formInputs, token);
      } else {
        if (employee.id)
          await VaccinationService.updateVaccination(
            employee.id,
            formInputs,
            token
          );
      }

      dispatch(allActionCreators.setVaccinationLoading(false));
      history.push(RouteNames.SUCCESS_PAGE);
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
      attachments: [...prev.attachments.filter((att) => att.name !== name)],
    }));
  };

  // get existing vax8 record
  useEffect(() => {
    if (employee.id)
      dispatch(allActionCreators.fetchVaccination(employee.id, token));
  }, [dispatch, employee.id]);

  //set local vax8 state if there is an existing record
  useEffect(() => {
    if (vaccinationRecord) {
      const toState: IVaccinationRecord = {
        id: vaccinationRecord.id,
        employeeId: employee.id,
        shot: vaccinationRecord.shot,
        firstShotDate: vaccinationRecord.firstShotDate,
        secondShotDate: vaccinationRecord.secondShotDate,
        boosterDate: vaccinationRecord.boosterDate,
        comment: vaccinationRecord.comment,
        attachments: [],
      };

      setFormInputs(toState);
    }
  }, [vaccinationRecord]);

  return (
    <form className="vax8-form" onSubmit={submitForm}>
      <Stack verticalAlign="start" styles={vaccinationFormContainerStyle}>
        <EmployeeCard />
        <Separator />
        <VaccinateStatusSelection
          id="shot"
          label="Your current vaccination status"
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
            label="First shot date"
            required
          />
        )}

        {formInputs.shot === ShotsOptionsEnum.TWO && (
          <CalendarInput
            id="secondShotDate"
            value={
              formInputs.secondShotDate ? formInputs.secondShotDate : new Date()
            }
            onChange={onDateChange}
            label="Second shot date"
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
        <Label>Comment (vaccine info [Pfizer, Astrazeneca etc])</Label>
        <textarea
          id="comment"
          cols={40}
          rows={5}
          value={formInputs.comment}
          onChange={(e) => onInputChange("comment", e.target.value)}
          disabled={isLoading}
          style={{ marginLeft: 1 }}
        />
        <Stack styles={{ root: { minHeight: 20 } }} />
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

        {error && (
          <MessageBar
            messageBarType={MessageBarType.error}
            onDismiss={() =>
              dispatch(allActionCreators.setVaccinationError(null))
            }
            styles={errorMessageBarStyle}
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
        <Stack styles={{ root: { minHeight: 20 } }} />
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
