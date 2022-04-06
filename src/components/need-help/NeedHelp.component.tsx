import { Link, Stack } from "@fluentui/react";
import { helpEmailAU, helpEmailNZ } from "../../const/strings";
import { helpEmailStyle } from "../login/LoginFormObjectStyles";

const NeedHelp = () => (
  <Stack horizontal horizontalAlign="end" styles={{ root: { paddingTop: 20 } }}>
    <Link href={helpEmailAU} styles={helpEmailStyle}>
      I need help, and am in AU
    </Link>
    <Link href={helpEmailNZ} styles={helpEmailStyle}>
      I need help, and am in NZ
    </Link>
  </Stack>
);

export default NeedHelp;
