import { Icon, Label } from "@fluentui/react";
import { FC } from "react";
import { icon } from "../utils/iconsUtil";
import { useHistory } from "react-router-dom";

export const SuccessPage: FC = () => {
  const history = useHistory();
  function refreshPage() {
    history.push("/");
    window.location.reload();
  }

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

      <Icon
        styles={{ root: { fontSize: 38, color: "#95c94e", marginRight: 10 } }}
        iconName={icon.completed.iconName}
        onClick={refreshPage}
      />

      <Label>{"Success"}</Label>
      {/* </Stack> */}
    </div>
  );
};
