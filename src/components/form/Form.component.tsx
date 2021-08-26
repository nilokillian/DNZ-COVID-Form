import {
  IChoiceGroupOption,
  Label,
  PrimaryButton,
  Stack,
} from "@fluentui/react";
import React from "react";
import { CalendarInput } from "../controls/CalendarInput.component";
import { RadioButtonControl } from "../controls/RadioButton.component";
import { TextInputControl } from "../controls/TextInput.component";
import { WebcamCapture } from "../controls/Webcam.component";
import "./form.css";
import injectionIcon from "../../injection.svg";

const businessUnits: IChoiceGroupOption[] = [
  {
    key: "bituminousAndSpecialistServices",
    text: "Bituminous & Specialist Services",
  },
  { key: "DMRoads", text: "DM Roads" },
  { key: "headOffice", text: "Head Office" },
  { key: "plantAssets", text: "Plant & Assets" },
  { key: "pavements", text: "Pavements" },
  { key: "tasmania", text: "Tasmania" },
];

// export enum VaccineStatus {
//   AWAITING = "Awaiting booking",
//   STARTED = "Started",
// }

export interface IForm {
  firstName: string;
  lastName: string;
  employeeNumber: string;
  businessUnit: string;
  vaccineStatus: string;
  secondVaccineDate: string;
  firstVaccineDate: string;
  vaccineShotsCount: string;
  photo?: string;
  attachment?: string;
  vaccineInfo?: string;
}

export interface IFormProps {
  consent: boolean;
}

export const Form: React.FC<IFormProps> = ({ consent }) => {
  const [formInputs, setFormInputs] = React.useState<IForm>({
    firstName: "",
    lastName: "",
    employeeNumber: "",
    businessUnit: "",
    secondVaccineDate: "",
    firstVaccineDate: "",
    vaccineStatus: "AWAITING",
    vaccineShotsCount: "",
    photo: "",
    attachment: "",
    vaccineInfo: "",
  });

  const submitForm = (e: any) => {
    e.preventDefault();
    setFormInputs({
      firstName: "",
      lastName: "",
      employeeNumber: "",
      businessUnit: "",
      secondVaccineDate: "",
      firstVaccineDate: "",
      vaccineShotsCount: "",
      vaccineStatus: "AWAITING",
      photo: "",
      attachment: "",
      vaccineInfo: "",
    });
  };

  const onInputChange = (id: string, value: string) => {
    setFormInputs({ ...formInputs, [id]: value });
  };

  return (
    <form className="formBody" onSubmit={submitForm}>
      <Label required styles={{ root: { textAlign: "right" } }}>
        Required
      </Label>
      <Stack
        verticalAlign="start"
        styles={{ root: { width: "50%", paddingLeft: 20, minHeight: 300 } }}
      >
        <TextInputControl
          id="firstName"
          label="First name"
          value={formInputs.firstName}
          onChange={onInputChange}
          required
          disabled={!consent}
        />
        <TextInputControl
          id="lastName"
          label="Last name"
          value={formInputs.lastName}
          onChange={onInputChange}
          required
          disabled={!consent}
        />

        <TextInputControl
          id="employeeNumber"
          label="Employee number"
          value={formInputs.employeeNumber}
          onChange={onInputChange}
          required
          disabled={!consent}
        />
        <RadioButtonControl
          id="businessUnit"
          label="What is your Business Unit?"
          value={formInputs.businessUnit}
          onChange={onInputChange}
          options={businessUnits}
          disabled={!consent}
        />
        <RadioButtonControl
          id="vaccineStatus"
          label="What is your vaccine status ?"
          value={formInputs.vaccineStatus}
          disabled={!consent}
          onChange={(id, value) => {
            setFormInputs({
              ...formInputs,
              [id]: value,
              vaccineShotsCount: "1_shot",
            });
          }}
          options={[
            { key: "AWAITING", text: "Awaiting" },
            { key: "STARTED", text: "Started" },
          ]}
        />
        {formInputs.vaccineStatus === "STARTED" && (
          <RadioButtonControl
            id="vaccineShotsCount"
            label="How many shots do you have ?"
            value={formInputs.vaccineShotsCount}
            onChange={onInputChange}
            withImage={true}
            image={injectionIcon}
            disabled={!consent}
            options={[
              { key: "1_shot", text: "One shot" },
              { key: "2_shot", text: "Two shots" },
            ]}
          />
        )}

        {formInputs.vaccineStatus === "STARTED" && (
          <>
            <CalendarInput
              id="firstVaccineDate"
              value={formInputs.firstVaccineDate}
              onChange={onInputChange}
              label="First vaccine date"
              required
            />
            <CalendarInput
              id="secondVaccineDate"
              value={formInputs.secondVaccineDate}
              onChange={onInputChange}
              label="Second vaccine date"
              required
            />
          </>
        )}

        <TextInputControl
          id="vaccineInfo"
          label="Vaccine info"
          value={formInputs.vaccineInfo}
          onChange={onInputChange}
          disabled={!consent}
          multipleLine={true}
          rows={4}
        />

        <WebcamCapture />

        <PrimaryButton
          text="Submit"
          disabled={!consent}
          onClick={submitForm}
          styles={{
            root: {
              backgroundColor: "#5bc2e7",
              width: 200,
              height: 40,
              borderColor: "#5bc2e7",
            },
          }}
        />
      </Stack>
    </form>
  );
};
