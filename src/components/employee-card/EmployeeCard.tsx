import { FC } from "react";
import { Label, Stack } from "@fluentui/react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import {
  IVaccinationRecord,
  ShotsOptionsEnum,
} from "../../store/reducers/vaccination/types";
import { employeeCardLabelStyle } from "./EmployeeCardStyledObjects";

export const EmployeeCard: FC = (): JSX.Element => {
  const {
    auth: { employee },
    vaccination: { vaccinationRecord },
  } = useTypedSelector((state) => state);

  const composeVax8Record = (
    shotOption: ShotsOptionsEnum,
    record: IVaccinationRecord
  ) => {
    switch (shotOption) {
      case ShotsOptionsEnum.ONE:
        return `Vacciantion: First shot taken ${record.firstShotDate}`;

      case ShotsOptionsEnum.TWO:
        return `Vacciantion: Two shots taken, last shot date ${record.firstShotDate}`;

      case ShotsOptionsEnum.BOOSTER:
        return `Vacciantion: Booster, last shot date ${record.boosterDate}`;

      case ShotsOptionsEnum.EXEMPTION:
        return "You have an exemption";
    }
  };
  return (
    <Stack verticalAlign="center">
      <Label styles={employeeCardLabelStyle}>
        Employee:{" "}
        {`${employee.firstName} ${employee.lastName} [ No ${employee.employeeNumber} ]`}
      </Label>
      <Label styles={employeeCardLabelStyle}>
        Business unit:{" "}
        <span>{`${
          employee.businessUnit ? employee.businessUnit.name : ""
        }`}</span>
      </Label>
      {vaccinationRecord && (
        <Label styles={employeeCardLabelStyle}>
          {composeVax8Record(vaccinationRecord.shot, vaccinationRecord)}
        </Label>
      )}
      {vaccinationRecord && vaccinationRecord.attachments.length > 0 && (
        <Label styles={employeeCardLabelStyle}>
          Attachments:{" "}
          {vaccinationRecord.attachments.map((att) => att.name).join("; ")}
        </Label>
      )}
    </Stack>
  );
};
