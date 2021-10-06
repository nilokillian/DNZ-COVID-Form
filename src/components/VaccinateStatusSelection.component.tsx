import { ChoiceGroup, IChoiceGroupOption } from "@fluentui/react";
import oneShotIcon from "../images/one-shot.svg";
import twoShotIcon from "../images/two-shots.svg";
import boosterIcon from "../images/booster.svg";
import { IVaccinateStatusSelectionProps } from "../models/IVaccinateStatusSelection";
import { FC, FormEvent } from "react";
import { ShotsOptionsEnum } from "../store/reducers/vaccination/types";
import { useTypedSelector } from "../hooks/useTypedSelector";

export const VaccinateStatusSelection: FC<IVaccinateStatusSelectionProps> = ({
  id,
  label,
  value,
  onChange,
  disabled,
}) => {
  const { vaccinationRecord } = useTypedSelector((state) => state.vaccination);

  const options: IChoiceGroupOption[] = [
    {
      key: ShotsOptionsEnum.ZERO,
      text: "Zero shots",
      iconProps: { iconName: "Decimals" },
      imageSize: { width: 29, height: 32 },
      disabled:
        vaccinationRecord !== null &&
        (vaccinationRecord.shot === ShotsOptionsEnum.ONE ||
          vaccinationRecord.shot === ShotsOptionsEnum.TWO ||
          vaccinationRecord.shot === ShotsOptionsEnum.BOOSTER ||
          vaccinationRecord.shot === ShotsOptionsEnum.EXEMPTION),
    },
    {
      key: ShotsOptionsEnum.ONE,
      text: "One shot",
      imageSrc: oneShotIcon,
      selectedImageSrc: oneShotIcon,
      imageSize: { width: 28, height: 32 },
      disabled:
        vaccinationRecord !== null &&
        (vaccinationRecord.shot === ShotsOptionsEnum.TWO ||
          vaccinationRecord.shot === ShotsOptionsEnum.BOOSTER ||
          vaccinationRecord.shot === ShotsOptionsEnum.EXEMPTION),
    },
    {
      key: ShotsOptionsEnum.TWO,
      text: "Two shot",
      imageSrc: twoShotIcon,
      selectedImageSrc: twoShotIcon,
      imageSize: { width: 36, height: 32 },
      disabled:
        vaccinationRecord !== null &&
        (vaccinationRecord.shot === ShotsOptionsEnum.BOOSTER ||
          vaccinationRecord.shot === ShotsOptionsEnum.EXEMPTION),
    },
    {
      key: ShotsOptionsEnum.BOOSTER,
      text: "Booster",
      imageSrc: boosterIcon,
      selectedImageSrc: boosterIcon,
      imageSize: { width: 40, height: 32 },
      disabled:
        vaccinationRecord !== null &&
        vaccinationRecord.shot === ShotsOptionsEnum.EXEMPTION,
    },
    {
      key: ShotsOptionsEnum.EXEMPTION,
      text: "Exemption",
      iconProps: { iconName: "Info" },
      imageSize: { width: 36, height: 32 },
      disabled:
        vaccinationRecord !== null &&
        (vaccinationRecord.shot === ShotsOptionsEnum.ONE ||
          vaccinationRecord.shot === ShotsOptionsEnum.TWO ||
          vaccinationRecord.shot === ShotsOptionsEnum.BOOSTER),
    },
  ];

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
        field: {},
      },
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
        options={composeOptions(options)}
        onChange={onRadioChange}
        label={label}
        required
      />
    </div>
  );
};
