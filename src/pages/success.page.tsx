import { Icon, Label } from "@fluentui/react";
import { FC, useEffect } from "react";
import { icon } from "../utils/iconsUtil";
import { Link } from "react-router-dom";
import { IEmployee, useSharedState } from "../context/App.context";

export const SuccessPage: FC = () => {
  const [sharedState, setSharedState] = useSharedState();

  useEffect(() => {
    if (sharedState)
      setSharedState(() => ({
        employee: {} as IEmployee,

        sentVerificationCode: "",
        loading: false,
        error: null,
        verificationPassed: false,
      }));
  }, [setSharedState, sharedState]);
  return (
    <div
      className="success-page-container"
      style={{
        minHeight: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <Stack verticalAlign="center"> */}
      <Link to="/login">
        <Icon
          styles={{ root: { fontSize: 38, color: "#95c94e", marginRight: 10 } }}
          iconName={icon.completed.iconName}
        />
      </Link>
      <Label>{"Success"}</Label>
      {/* </Stack> */}
    </div>
  );
};
