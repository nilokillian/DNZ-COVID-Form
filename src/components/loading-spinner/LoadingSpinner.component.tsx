import { Spinner, SpinnerSize } from "@fluentui/react";
import { FC } from "react";

export const LoadingSpinner: FC = () => (
  <Spinner
    label="Loading..."
    ariaLive="assertive"
    labelPosition="top"
    size={SpinnerSize.medium}
    styles={{
      root: {
        top: "80%",
        margin: "auto",
        left: "50%",
        zIndex: 1000,
      },
    }}
  />
);
