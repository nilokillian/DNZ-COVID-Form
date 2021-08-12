import {
  IChoiceGroupOption,
  Label,
  PrimaryButton,
  Image,
} from "@fluentui/react";
import React from "react";
import { CalendarInput } from "../controls/CalendarInput.component";
import { RadioButtonControl } from "../controls/RadioButton.component";
import { TextInputControl } from "../controls/TextInput.component";
import logo from "../../downer.png";

import "./form.css";

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

export interface IForm {
  firstName: string;
  lastName: string;
  hasEmployeeNumber: string;
  employeeNumber: string;
  businessUnit: string;
  secondVaccine: string;
  secondVaccineDate: string;
  firstVaccine: string;
  firstVaccineDate: string;
}

export interface IFormProps {}

export const Form: React.FC<IFormProps> = () => {
  const [formInputs, setFormInputs] = React.useState<IForm>({
    firstName: "",
    lastName: "",
    hasEmployeeNumber: "",
    employeeNumber: "",
    businessUnit: "",
    secondVaccine: "",
    secondVaccineDate: "",
    firstVaccine: "",
    firstVaccineDate: "",
  });

  const submitForm = (e: any) => {
    e.preventDefault();
    setFormInputs({
      firstName: "",
      lastName: "",
      hasEmployeeNumber: "",
      employeeNumber: "",
      businessUnit: "",
      secondVaccine: "",
      secondVaccineDate: "",
      firstVaccine: "",
      firstVaccineDate: "",
    });
  };

  const onInputChange = (id: string, value: string) => {
    setFormInputs({ ...formInputs, [id]: value });
  };

  return (
    <div className="formContainer">
      <div className="formTitle">
        <Image
          src={logo}
          styles={{
            image: {
              width: 200,
            },
          }}
        />
        <div className="formHeading">
          <span> Codid-19 Vaccine Tracker</span>
        </div>
      </div>
      <form className="formBody" onSubmit={submitForm}>
        <Label required>Required</Label>
        <TextInputControl
          id="firstName"
          label="1.First Name"
          value={formInputs.firstName}
          onChange={onInputChange}
          required
        />
        <TextInputControl
          id="lastName"
          label="2.last Name"
          value={formInputs.lastName}
          onChange={onInputChange}
          required
        />
        <RadioButtonControl
          id="hasEmployeeNumber"
          label="3.Do you have an employee number?"
          value={formInputs.hasEmployeeNumber}
          onChange={onInputChange}
          options={[
            { key: "yes", text: "Yes" },
            { key: "no", text: "No" },
          ]}
        />
        <TextInputControl
          id="employeeNumber"
          label="4.Employee Number"
          value={formInputs.employeeNumber}
          onChange={onInputChange}
          required={!formInputs.hasEmployeeNumber}
        />
        <RadioButtonControl
          id="businessUnit"
          label="5.What is your Business Unit?"
          value={formInputs.businessUnit}
          onChange={onInputChange}
          options={businessUnits}
        />
        <RadioButtonControl
          id="secondVaccine"
          label="6.Have you had your second COVID-19 vaccine?"
          value={formInputs.secondVaccine}
          onChange={onInputChange}
          options={[
            { key: "yes", text: "Yes" },
            { key: "no", text: "No" },
          ]}
        />
        {formInputs.secondVaccine === "no" && (
          <RadioButtonControl
            id="firstVaccine"
            label="7.Have you had your first COVID-19 vaccine?"
            value={formInputs.firstVaccine}
            onChange={onInputChange}
            options={[
              { key: "yes", text: "Yes" },
              { key: "no", text: "No" },
            ]}
          />
        )}
        {(formInputs.secondVaccine === "yes" ||
          (formInputs.secondVaccine === "no" &&
            formInputs.firstVaccine === "yes")) && (
          <CalendarInput
            id="firstVaccineDate"
            label={`${
              formInputs.secondVaccine === "yes" ? "7" : "8"
            }.What date did you have your ${
              formInputs.secondVaccine == "yes" ? "second" : "first"
            } COVID-19 vaccine?`}
            value={formInputs.firstVaccineDate}
            required
            onChange={onInputChange}
          />
        )}

        <PrimaryButton
          text="Submit"
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
      </form>
    </div>
  );
};
