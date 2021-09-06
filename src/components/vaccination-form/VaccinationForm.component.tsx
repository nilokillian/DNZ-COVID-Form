import {
  Label,
  PrimaryButton,
  Stack,
  Separator,
  Toggle,
  Spinner,
  SpinnerSize,
} from "@fluentui/react";
import { FC, useEffect, useState, MouseEvent } from "react";
import { CalendarInput } from "../../controls/calendar/CalendarInput.component";
import { RadioButtonControl } from "../../controls/RadioButton.component";
import { FileInput } from "../../controls/file-input/FileInput";
import injectionIcon from "../../injection.svg";
import { EmployeeCard } from "../employee-card/EmployeeCard";

import "./form.css";

import {
  submitFromBtnStyle,
  vaccinationFormContainerStyle,
} from "./VaccinationFormStyledObjects";
import { getVaccination } from "../../api/employee.api";
import {
  createVaccination,
  updateVaccination,
} from "../../api/vaccination.api";
import { IVaccination, useSharedState } from "../../context/App.context";
import { DisplayAttachment } from "../display-attachment/DisplayAttachment.component";

const vaccineShotsOptions = [
  { key: "0", text: "Zero shot" },
  { key: "1", text: "One shot" },
  { key: "2", text: "Two shots" },
];

export enum FormMode {
  new = "NEW",
  edit = "EDIT",
}

export const VaccinationForm: FC = () => {
  const [sharedState, setSharedState] = useSharedState();
  const [formInputs, setFormInputs] = useState<IVaccination>({
    id: undefined,
    shots: 0,
    firstShotDate: null,
    seconShotDate: null,
    thirdShotDate: null,
    hasExeptionCertificate: false,
    comment: "",
    attachment: [],
  });
  const [formMode, setFormMode] = useState<FormMode>();

  const submitForm = async (e: any) => {
    e.preventDefault();

    if (formMode === FormMode.new) {
      const payload = { ...formInputs, employeeId: 8 };

      await createVaccination(payload);
    } else {
      try {
        await updateVaccination(formInputs.id!, formInputs);
      } catch (error) {
        console.log(error);
      }
    }

    // setFormInputs({
    //   secondVaccineDate: "",
    //   firstVaccineDate: "",
    //   vaccineShotsCount: 0,
    //   attachment: "",
    //   comment: "",
    // });
  };

  const onInputChange = (id: string, value: string) => {
    setFormInputs({ ...formInputs, [id]: value });
  };

  const onDateChange = (id: string, value: Date) => {
    setFormInputs({ ...formInputs, [id]: value });
  };

  const onAttachmentChange = (name: string, file: string) => {
    setFormInputs((prev) => ({
      ...prev,
      attachment: [...prev.attachment, { name, file }],
    }));
  };

  const onAttachmentRemove = (name: string) => {
    setFormInputs((prev) => ({
      ...prev,
      attachment: [...prev.attachment.filter((att) => att.name !== name)],
    }));
  };

  useEffect(() => {
    getVaccination(8)
      .then((response) => {
        const { data } = response;

        if (data.vaccination) {
          const { vaccination } = data;

          console.log(data);
          setFormInputs({
            id: vaccination.id,
            firstShotDate: vaccination.firstShotDate,
            seconShotDate: vaccination.seconShotDate,
            hasExeptionCertificate: vaccination.hasExeptionCertificate,
            comment: vaccination.comment,
            shots: vaccination.shots,
            attachment: [],
          });
          setFormMode(FormMode.edit);
        } else {
          setFormMode(FormMode.new);
        }
      })
      .catch((error) => error);
  }, []);

  return (
    <form className="formBody" onSubmit={submitForm}>
      <Stack verticalAlign="start" styles={vaccinationFormContainerStyle}>
        <EmployeeCard />
        <Separator />
        <RadioButtonControl
          id="shots"
          label="How many shots do you have ?"
          value={formInputs.shots.toString()}
          onChange={onInputChange}
          withImage={true}
          image={injectionIcon}
          disabled={sharedState.loading}
          required
          options={vaccineShotsOptions}
        />
        <Separator />
        <Toggle
          label="Do you have an exeption certificate ?"
          checked={formInputs.hasExeptionCertificate}
          onChange={(_ev: MouseEvent<HTMLElement>, checked?: boolean) =>
            setFormInputs((prev) => ({
              ...prev,
              hasExeptionCertificate: checked!,
            }))
          }
          onText="Yes"
          offText="No"
          styles={{ container: { marginTop: 30, marginBottom: 20 } }}
          disabled={sharedState.loading}
        />
        {formInputs.shots > 0 && (
          <>
            <CalendarInput
              id="firstShotDate"
              value={
                formInputs.firstShotDate ? formInputs.firstShotDate : new Date()
              }
              onChange={onDateChange}
              label="First vaccine date"
              required
            />
            {formInputs.shots > 1 && (
              <CalendarInput
                id="seconShotDate"
                value={
                  formInputs.seconShotDate
                    ? formInputs.seconShotDate
                    : new Date()
                }
                onChange={onDateChange}
                label="Second vaccine date"
                required
              />
            )}
          </>
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
          disabled={sharedState.loading}
        />
        <Separator />

        <FileInput
          id="attachment"
          inputLabel="Add attachment"
          onChange={onAttachmentChange}
          name="attachment"
          disabled={sharedState.loading}
        />
        <DisplayAttachment
          data={formInputs.attachment}
          onRemove={onAttachmentRemove}
        />
        <Separator />
        <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 5 }}>
          <PrimaryButton
            text={sharedState.loading ? "Submitting" : "Submit"}
            disabled={sharedState.loading}
            onClick={submitForm}
            styles={submitFromBtnStyle}
          />
          {sharedState.loading && <Spinner size={SpinnerSize.large} />}
        </Stack>

        <PrimaryButton
          text="Loadiing"
          disabled={false}
          onClick={() =>
            setSharedState((prev) => ({ ...prev, loading: !prev.loading }))
          }
          styles={submitFromBtnStyle}
        />
      </Stack>
    </form>
  );
};
