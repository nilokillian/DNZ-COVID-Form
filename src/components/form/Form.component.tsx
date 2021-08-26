import {
  IChoiceGroupOption,
  Label,
  PrimaryButton,
  Stack,
  ActionButton,
  IIconProps,
  Separator,
} from "@fluentui/react";
import React from "react";
import { CalendarInput } from "../controls/CalendarInput.component";
import { RadioButtonControl } from "../controls/RadioButton.component";
import { TextInputControl } from "../controls/TextInput.component";
import { WebcamCapture } from "../controls/Webcam.component";
import { FileInput } from "../controls/FileInput";
import { ModalWindow } from "../modal/Modal.component";

import injectionIcon from "../../injection.svg";
import "./form.css";

const cameraIcon: IIconProps = { iconName: "Camera" };
const addCommentIcon: IIconProps = { iconName: "Comment" };
const attachIcon: IIconProps = { iconName: "Attach" };

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

  const [cameraWindow, setCameraWindow] = React.useState<boolean>(false);
  const [commentWindow, setCommentWindow] = React.useState<boolean>(false);
  const [attachmentWindow, setAttachmentWindow] =
    React.useState<boolean>(false);

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
        styles={{ root: { width: "70%", paddingLeft: 20, minHeight: 300 } }}
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
          required
        />
        <RadioButtonControl
          id="vaccineStatus"
          label="What is your vaccine status ?"
          value={formInputs.vaccineStatus}
          disabled={!consent}
          required
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
            required
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
            {formInputs.vaccineShotsCount === "2_shot" && (
              <CalendarInput
                id="secondVaccineDate"
                value={formInputs.secondVaccineDate}
                onChange={onInputChange}
                label="Second vaccine date"
                required
              />
            )}
          </>
        )}

        <Separator />
        <Stack horizontal wrap>
          <ActionButton
            iconProps={cameraIcon}
            allowDisabledFocus
            disabled={!consent}
            onClick={() => setCameraWindow(true)}
            styles={{
              icon: { fontSize: 30 },
              root: { paddingTop: 10, paddingBottom: 10 },
            }}
          >
            Take a photo
          </ActionButton>
          <ActionButton
            iconProps={addCommentIcon}
            allowDisabledFocus
            disabled={!consent}
            onClick={() => setCommentWindow(true)}
            styles={{
              icon: { fontSize: 30 },
              root: { paddingTop: 10, paddingBottom: 10 },
            }}
          >
            Add comment
          </ActionButton>

          <ActionButton
            iconProps={attachIcon}
            allowDisabledFocus
            disabled={!consent}
            onClick={() => setAttachmentWindow(true)}
            styles={{
              icon: { fontSize: 30 },
              root: { paddingTop: 10, paddingBottom: 10 },
            }}
          >
            Add attachment
          </ActionButton>
        </Stack>
        <Separator />
        <ModalWindow
          isModalOpen={cameraWindow}
          hideModal={() => setCameraWindow(false)}
        >
          <WebcamCapture />
        </ModalWindow>
        <ModalWindow
          isModalOpen={commentWindow}
          hideModal={() => setCommentWindow(false)}
        >
          <Label>
            Free text / to enter vaccine info (Pfizer, Astrazeneca etc)
          </Label>
          <textarea
            id="vaccineInfo"
            cols={40}
            rows={5}
            value={formInputs.vaccineInfo}
            onChange={(e) => onInputChange("vaccineInfo", e.target.value)}
          />
        </ModalWindow>
        <ModalWindow
          isModalOpen={attachmentWindow}
          hideModal={() => setAttachmentWindow(false)}
        >
          <FileInput
            id="attachment"
            inputLabel="Attach file"
            onChange={onInputChange}
            name="attachment"
          />
        </ModalWindow>
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
              marginTop: 50,
              marginBottom: 30,
            },
          }}
        />
      </Stack>
    </form>
  );
};
