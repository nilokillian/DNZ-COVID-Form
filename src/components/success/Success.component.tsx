import { Icon, Label, Stack } from "@fluentui/react";
import { FC } from "react";
import { useAction } from "../../hooks/useAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { VaccinationFormModeEnum } from "../../store/reducers/vaccination/types";
import { icon } from "../../utils/iconsUtil";
import { containerStyle, iconStyle, labelStyle } from "./SuccessStyledObject";

export const Success: FC = (): JSX.Element => {
  const { formMode } = useTypedSelector((state) => state.vaccination);
  const { logout, setVaccinationRecord, setFormMode } = useAction();

  const onCleanUp = () => {
    setVaccinationRecord(null);
    setFormMode(VaccinationFormModeEnum.NEW);
    logout();
  };

  return (
    <Stack
      wrap
      horizontal
      horizontalAlign="center"
      tokens={{ childrenGap: 10 }}
      styles={containerStyle}
    >
      <Icon
        styles={iconStyle}
        iconName={icon.completed.iconName}
        onClick={onCleanUp}
      />

      <Label styles={labelStyle}>
        {formMode === VaccinationFormModeEnum.NEW
          ? "Your vaccination record has been created"
          : "Your vaccination record has been updated"}
      </Label>
    </Stack>
  );
};
