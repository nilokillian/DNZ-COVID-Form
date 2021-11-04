import React, { FormEvent } from "react";
import {
  ChoiceGroup,
  IChoiceGroupOption,
} from "@fluentui/react/lib/ChoiceGroup";
import { Vaccine } from "../store/reducers/vaccination/types";

const options: IChoiceGroupOption[] = [
  { key: Vaccine.PFIZER, text: Vaccine.PFIZER },
  { key: Vaccine.ASTRAZENECA, text: Vaccine.ASTRAZENECA },
  { key: Vaccine.MODERNA, text: Vaccine.MODERNA },
  { key: Vaccine.OTHER, text: Vaccine.OTHER },
];

export interface IVaccineNameSelectionProps {
  id: string;
  label: string;
  onChange: (id: string, value: string) => void;
  value: string | null;
  isDisabled: boolean;
  country: string;
}

export const VaccineSelection: React.FC<IVaccineNameSelectionProps> = ({
  id,
  label,
  value,
  onChange,
  isDisabled,
  country,
}) => {
  const getOptions = () => {
    switch (country) {
      case "NZ":
        return options;

      case "AU":
        return options.filter((opt) => opt.key !== Vaccine.OTHER);

      default:
        return options;
    }
  };

  const onVaccineChange = (
    _ev?: FormEvent<HTMLElement | HTMLInputElement> | undefined,
    option?: IChoiceGroupOption | undefined
  ) => {
    if (option) {
      onChange(id, option.key);
    }
  };

  return (
    <ChoiceGroup
      selectedKey={value === null ? "" : value}
      options={getOptions()}
      onChange={onVaccineChange}
      label={label}
      disabled={isDisabled}
      required={true}
      styles={{
        root: {
          paddingTop: 15,
          paddingBottom: 15,
        },
      }}
    />
  );
};
