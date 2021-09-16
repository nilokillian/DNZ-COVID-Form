import { FC } from "react";
import { Label, Stack } from "@fluentui/react";
import { useTypedSelector } from "../../hooks/useTypedSelector";

export const EmployeeCard: FC = (): JSX.Element => {
  const { employee } = useTypedSelector((state) => state.auth);

  return (
    <Stack verticalAlign="center">
      <Label styles={{ root: { backgroundColor: "#f3f2f1", paddingLeft: 5 } }}>
        Employee: {`${employee.firstName} ${employee.lastName}`}{" "}
      </Label>
      <Label styles={{ root: { backgroundColor: "#f3f2f1", paddingLeft: 5 } }}>
        Employee number: {`${employee.employeeNumber}`}
      </Label>
      <Label styles={{ root: { backgroundColor: "#f3f2f1", paddingLeft: 5 } }}>
        Business unit:{" "}
        <span>{`${
          employee.businessUnit ? employee.businessUnit.name : ""
        }`}</span>
      </Label>
    </Stack>
  );
};
