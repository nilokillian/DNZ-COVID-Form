import { ChoiceGroup, IChoiceGroupOption } from "@fluentui/react";
import { FormEvent } from "react";
import injectionIcon from "../../injection.svg";

export interface IRadioButtonWithImageControlProps {
  id: string;
  label: string;
  options: IChoiceGroupOption[];
  value: string;
  onChange: (id: string, value: string) => void;
}

const options: IChoiceGroupOption[] = [
  {
    key: "shot_1",
    imageSrc: injectionIcon,
    imageAlt: "Bar chart icon",
    selectedImageSrc: injectionIcon,
    imageSize: { width: 22, height: 22 },
    text: "One shot",
  },
  {
    key: "shot_2",
    imageSrc: injectionIcon,
    selectedImageSrc: injectionIcon,
    imageSize: { width: 22, height: 22 },
    text: "Two Shots",
  },
];

export const RadioButtonWithImageControl: React.FC<IRadioButtonWithImageControlProps> =
  ({ id, label, value, onChange }) => {
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
        className="radioControl"
        style={{
          padding: "10px 0px 5px",
        }}
      >
        <ChoiceGroup
          multiple={true}
          label="Pick one image"
          defaultSelectedKey="bar"
          options={options}
        />
      </div>
    );
  };
