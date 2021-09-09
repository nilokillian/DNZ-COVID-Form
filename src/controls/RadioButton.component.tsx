import { ChoiceGroup, IChoiceGroupOption } from "@fluentui/react";
import { FormEvent } from "react";

export interface IRadioButtonControlProps {
  id: string;
  label: string;
  options: IChoiceGroupOption[];
  value: string;
  withImage?: boolean;
  image?: string;
  onChange: (id: string, value: string) => void;
  disabled?: boolean;
  required?: boolean;
}

export const RadioButtonControl: React.FC<IRadioButtonControlProps> = ({
  id,
  label,
  value,
  options,
  onChange,
  withImage,
  image,
  disabled,
  required,
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

  const composeOptions = (
    optionsProps: IChoiceGroupOption[]
  ): IChoiceGroupOption[] =>
    optionsProps.map((option) => ({
      ...option,
      imageSrc: image,
      imageAlt: option.key,
      selectedImageSrc: image,
      imageSize: { width: 22, height: 22 },
    }));

  return (
    <div
      className="radioControl"
      style={{
        padding: "10px 0px 5px",
      }}
    >
      <ChoiceGroup
        disabled={disabled}
        selectedKey={value}
        options={withImage ? composeOptions(options) : options}
        onChange={onRadioChange}
        label={label}
        styles={{ label: { fontSize: 12 } }}
        required={required}
      />
    </div>
  );
};
