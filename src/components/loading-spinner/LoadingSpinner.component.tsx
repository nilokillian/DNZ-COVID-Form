import { Spinner, SpinnerSize } from "@fluentui/react";
import { FC } from "react";

export const LoadingSpinner: FC = () => (
  <Spinner
    label="Loading..."
    ariaLive="assertive"
    labelPosition="top"
    size={SpinnerSize.large}
    styles={{
      root: {
        top: "35%",
        margin: "auto",
        left: "46%",
        zIndex: 1000,
        position: "absolute",
      },
    }}
  />
);
