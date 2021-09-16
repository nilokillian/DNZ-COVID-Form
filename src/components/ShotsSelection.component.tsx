import { ChoiceGroup, IChoiceGroupOption } from "@fluentui/react";
import oneShotIcon from "../images/one-shot.svg";
import twoShotIcon from "../images/two-shots.svg";
import boosterIcon from "../images/booster.svg";
import {
  IRadioButtonControlProps,
  ShotsOptionsEnum,
} from "../models/IShotsSelection";
import { FormEvent } from "react";

const options: IChoiceGroupOption[] = [
  {
    key: ShotsOptionsEnum.ZERO,
    text: "Zero shots",
    iconProps: { iconName: "Decimals" },
    imageSize: { width: 29, height: 32 },
  },
  {
    key: ShotsOptionsEnum.ONE,
    text: "One shot",
    imageSrc: oneShotIcon,
    selectedImageSrc: oneShotIcon,
    imageSize: { width: 28, height: 32 },
  },
  {
    key: ShotsOptionsEnum.TWO,
    text: "Two shot",
    imageSrc: twoShotIcon,
    selectedImageSrc: twoShotIcon,
    imageSize: { width: 36, height: 32 },
  },
  {
    key: ShotsOptionsEnum.BOOSTER,
    text: "Booster",
    imageSrc: boosterIcon,
    selectedImageSrc: boosterIcon,
    imageSize: { width: 40, height: 32 },
  },
  {
    key: ShotsOptionsEnum.EXEMPTION,
    text: "Exemption",
    iconProps: { iconName: "Info" },
    imageSize: { width: 36, height: 32 },
  },
];

export const ShotsSelection: React.FC<IRadioButtonControlProps> = ({
  id,
  label,
  value,
  onChange,
  disabled,
}) => {
  const onRadioChange = (
    _ev?: FormEvent<HTMLElement | HTMLInputElement> | undefined,
    option?: IChoiceGroupOption | undefined
  ) => {
    if (option) {
      onChange(id, option.key);
    }
  };

  const composeOptions = (
    optionsProps: IChoiceGroupOption[]
  ): IChoiceGroupOption[] =>
    optionsProps.map((option) => ({
      ...option,
      imageAlt: option.key,
      styles: {
        choiceFieldWrapper: { minWidth: 105 },
        labelWrapper: { maxWidth: 66 },
      },
      // styles: { labelWrapper: { maxWidth: 66 }, innerField: { width: 50 } },
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
        selectedKey={value as string}
        options={composeOptions(options)}
        onChange={onRadioChange}
        label={label}
        required
      />
    </div>
  );
};
