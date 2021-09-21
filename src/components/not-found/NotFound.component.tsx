import { DefaultButton, Label } from "@fluentui/react";
import { Link } from "react-router-dom";
import { FC } from "react";

export const NotFound: FC = (): JSX.Element => (
  <div className="not-found">
    <Label>Sorry, looks like nothing was found</Label>
    <Link to="/">
      <DefaultButton text="Back" />
    </Link>
  </div>
);
