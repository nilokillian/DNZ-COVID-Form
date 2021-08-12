import { ChoiceGroup, IChoiceGroupOption } from "@fluentui/react";
import { FormEvent } from "react";

export interface IRadioButtonControlProps {
  id: string;
  label: string;
  options: IChoiceGroupOption[];
  value: string;
  onChange: (id: string, value: string) => void;
}

export const RadioButtonControl: React.FC<IRadioButtonControlProps> = ({
  id,
  label,
  value,
  options,
  onChange,
}) => {
  const onRadioChange = (
    ev?: FormEvent<HTMLElement | HTMLInputElement> | undefined,
    option?: IChoiceGroupOption | undefined
  ) => {
    console.log(option);
    if (option) {
      onChange(id, option.key as string);
    }
  };

  return (
    <div
      className="radio"
      style={{
        padding: "20px 0px 30px",
      }}
    >
      <ChoiceGroup
        selectedKey={value}
        options={options}
        onChange={onRadioChange}
        label={label}
      />
    </div>
  );
};
