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
import { VaccineSelection } from "../VaccineSelection.component";

export const VaccinationForm: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    vaccination: { isLoading, formMode, error, vaccinationRecord },
    auth: { employee, token },
  } = useTypedSelector((state) => state);

  const [formInputs, setFormInputs] = useState<VaccinationFormState>({
    shot: ShotsOptionsEnum.ZERO,
    vaccine: null,
    firstShotDate: "",
    secondShotDate: "",
    boosterDate: "",
    comment: "",
    attachments: [],
  });

  const submitForm = async (e: any) => {
    e.preventDefault();
    dispatch(allActionCreators.setVaccinationLoading(true));

    try {
      if (formMode === VaccinationFormModeEnum.NEW && employee) {
        await VaccinationService.createVaccination(
          { ...formInputs, employeeId: employee.id },
          token
        );
      } else {
        if (employee)
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
    }
  };

  const onInputChange = (id: string, value: any) => {
    setFormInputs({ ...formInputs, [id]: value });
  };

  const onDateChange = (id: string, value: string) => {
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

  const defaultDate = (): string => {
    const dateSplit = new Date().toLocaleString().split(",")[0].split("/");

    return dateSplit[2] + "-" + dateSplit[0] + "-" + dateSplit[1];
  };

  // get existing vax8 record
  useEffect(() => {
    if (employee)
      dispatch(allActionCreators.fetchVaccination(employee.id, token));
  }, [dispatch, employee]);

  // Set /Re-set dates if Shot options switches
  useEffect(() => {
    switch (formInputs.shot) {
      case ShotsOptionsEnum.ONE:
        setFormInputs({
          ...formInputs,
          firstShotDate: defaultDate(),
          secondShotDate: vaccinationRecord
            ? vaccinationRecord.secondShotDate
            : "",
          boosterDate: vaccinationRecord ? vaccinationRecord.boosterDate : "",
        });
        break;
      case ShotsOptionsEnum.TWO:
        setFormInputs({
          ...formInputs,
          secondShotDate: defaultDate(),
          firstShotDate: vaccinationRecord
            ? vaccinationRecord.firstShotDate
            : "",
          boosterDate: vaccinationRecord ? vaccinationRecord.boosterDate : "",
        });
        break;
      case ShotsOptionsEnum.BOOSTER:
        setFormInputs({
          ...formInputs,
          boosterDate: defaultDate(),
          firstShotDate: vaccinationRecord
            ? vaccinationRecord.firstShotDate
            : "",
          secondShotDate: vaccinationRecord
            ? vaccinationRecord.secondShotDate
            : "",
        });
        break;
      default:
        setFormInputs({
          ...formInputs,
          boosterDate: vaccinationRecord ? vaccinationRecord.boosterDate : "",
          firstShotDate: vaccinationRecord
            ? vaccinationRecord.firstShotDate
            : "",
          secondShotDate: vaccinationRecord
            ? vaccinationRecord.secondShotDate
            : "",
        });
        break;
    }
  }, [formInputs.shot]);

  //set local vax8 state if there is an existing record
  useEffect(() => {
    if (vaccinationRecord) {
      const toState: IVaccinationRecord = {
        shot: vaccinationRecord.shot,
        vaccine: vaccinationRecord.vaccine,
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
        {formInputs.shot !== ShotsOptionsEnum.EXEMPTION &&
          formInputs.shot !== ShotsOptionsEnum.ZERO && (
            <VaccineSelection
              id="vaccine"
              label="Vaccine"
              value={formInputs.vaccine}
              onChange={onInputChange}
              isDisabled={
                vaccinationRecord !== null && !!vaccinationRecord.vaccine
              }
            />
          )}

        {formInputs.shot === ShotsOptionsEnum.ONE && (
          <CalendarInput
            id="firstShotDate"
            value={
              formInputs.firstShotDate
                ? formInputs.firstShotDate
                : defaultDate()
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
              formInputs.secondShotDate
                ? formInputs.secondShotDate
                : defaultDate()
            }
            onChange={onDateChange}
            label="Second shot date"
            required
          />
        )}
        {formInputs.shot === ShotsOptionsEnum.BOOSTER && (
          <CalendarInput
            id="boosterDate"
            value={
              formInputs.boosterDate ? formInputs.boosterDate : defaultDate()
            }
            onChange={onDateChange}
            label="Booster date"
            required
          />
        )}
        <Label>Employee comment</Label>
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
      </Stack>
    </form>
  );
};
