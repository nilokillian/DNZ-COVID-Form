import { FC } from "react";
import { Label, Stack } from "@fluentui/react";
import { useSharedState } from "../../context/App.context";

export const EmployeeCard: FC = () => {
  const [sharedState] = useSharedState();

  return (
    <Stack verticalAlign="center">
      <Label styles={{ root: { backgroundColor: "#f3f2f1", paddingLeft: 5 } }}>
        Employee Name :{" "}
        {`${sharedState.employee.firstName} ${sharedState.employee.lastName}`}{" "}
      </Label>
      <Label styles={{ root: { backgroundColor: "#f3f2f1", paddingLeft: 5 } }}>
        Employee number: {`${sharedState.employee.employeeNumber}`}
      </Label>
      <Label styles={{ root: { backgroundColor: "#f3f2f1", paddingLeft: 5 } }}>
        Business unit:{" "}
        <span>{`${
          sharedState.employee.businessUnit
            ? sharedState.employee.businessUnit.name
            : ""
        }`}</span>
      </Label>
    </Stack>
  );
};
