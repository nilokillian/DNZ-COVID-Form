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
  TextField,
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
  Vaccine,
} from "../../store/reducers/vaccination/types";
import VaccinationService, { Vax8Error } from "../../api/vaccination.service";
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
    preferredEmail: null,
    vaccineNameOther: "",
    DOB: null,
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
      let errorMsg = `${
        formMode === VaccinationFormModeEnum.NEW ? "Creating " : "Updating "
      }vaccination record failed : [error]`;

      if (error instanceof Vax8Error) {
        errorMsg = `${
          formMode === VaccinationFormModeEnum.NEW ? "Creating " : "Updating "
        }vaccination record failed : ${
          error.message ? error.message : "[vax-n-8 error]"
        }`;
      }

      dispatch(
        allActionCreators.setVaccinationError({
          [formMode === VaccinationFormModeEnum.NEW
            ? ErrorKeyEnum.CREATE_VACCINATION
            : ErrorKeyEnum.UPDATE_VACCINATION]: errorMsg,
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

  const isSubmitDisabled = () => {
    if (formMode === VaccinationFormModeEnum.NEW) {
      return (
        isLoading ||
        formInputs.DOB === null ||
        formInputs.preferredEmail === null ||
        !formInputs.DOB ||
        !formInputs.preferredEmail ||
        formInputs.attachments.length < 1
      );
    } else if (formMode === VaccinationFormModeEnum.EDIT) {
      return isLoading || formInputs.attachments.length < 1;
    } else {
      return false;
    }
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
    // const dateSplit = new Date().toLocaleString().split(",")[0].split("/");
    const result = new Date()
      .toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/");

    return result[2] + "-" + result[0] + "-" + result[1];
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
          firstShotDate:
            vaccinationRecord && vaccinationRecord.firstShotDate
              ? vaccinationRecord.firstShotDate
              : defaultDate(),
          secondShotDate: vaccinationRecord
            ? vaccinationRecord.secondShotDate
            : "",
          boosterDate: vaccinationRecord ? vaccinationRecord.boosterDate : "",
        });
        break;
      case ShotsOptionsEnum.TWO:
        setFormInputs({
          ...formInputs,
          secondShotDate:
            vaccinationRecord && vaccinationRecord.secondShotDate
              ? vaccinationRecord.secondShotDate
              : defaultDate(),
          firstShotDate: vaccinationRecord
            ? vaccinationRecord.firstShotDate
            : "",
          boosterDate: vaccinationRecord ? vaccinationRecord.boosterDate : "",
        });
        break;
      case ShotsOptionsEnum.BOOSTER:
        setFormInputs({
          ...formInputs,
          boosterDate:
            vaccinationRecord && vaccinationRecord.boosterDate
              ? vaccinationRecord.boosterDate
              : defaultDate(),
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
        preferredEmail: vaccinationRecord.preferredEmail,
        vaccineNameOther: vaccinationRecord.vaccineNameOther,
        DOB: vaccinationRecord.DOB,
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

        {employee && employee.country === "NZ" && (
          <>
            <TextField
              label="Preferred email"
              value={
                formInputs.preferredEmail !== null
                  ? formInputs.preferredEmail
                  : ""
              }
              required
              onChange={(e: any) =>
                onInputChange("preferredEmail", e.target.value)
              }
              disabled={
                vaccinationRecord !== null && !!vaccinationRecord.preferredEmail
              }
            />
            <CalendarInput
              id="DOB"
              value={formInputs.DOB}
              onChange={onDateChange}
              label="Date of birth"
              required
            />
          </>
        )}

        <VaccinateStatusSelection
          id="shot"
          label="Your current vaccination status"
          value={formInputs.shot}
          onChange={onInputChange}
          disabled={isLoading}
        />
        {formInputs.shot !== ShotsOptionsEnum.EXEMPTION &&
          formInputs.shot !== ShotsOptionsEnum.ZERO && (
            <>
              <VaccineSelection
                id="vaccine"
                label="Vaccine"
                value={formInputs.vaccine}
                onChange={onInputChange}
                country={employee ? employee.country : ""}
                isDisabled={
                  vaccinationRecord !== null && !!vaccinationRecord.vaccine
                }
              />
              {formInputs.vaccine === Vaccine.OTHER && (
                <TextField
                  label="Specify vaccine name"
                  value={
                    formInputs.vaccineNameOther
                      ? formInputs.vaccineNameOther
                      : ""
                  }
                  required
                  disabled={
                    vaccinationRecord !== null &&
                    !!vaccinationRecord.vaccineNameOther
                  }
                  onChange={(e: any) =>
                    onInputChange("vaccineNameOther", e.target.value)
                  }
                />
              )}
            </>
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
          required={true}
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
            disabled={isSubmitDisabled()}
            onClick={submitForm}
            styles={submitFromBtnStyle}
          />
          {isLoading && <Spinner size={SpinnerSize.large} />}
        </Stack>
      </Stack>
    </form>
  );
};
