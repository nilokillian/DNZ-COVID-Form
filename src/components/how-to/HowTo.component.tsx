import { Link, Stack } from "@fluentui/react";
import { helpEmailStyle } from "../login/LoginFormObjectStyles";
import HowToPDF from "../../how-to.pdf";
import TroubleshootPDF from "../../troubleshoot.pdf";

interface IHowToProps {
  fromForm?: boolean;
}

const HowTo: React.FC<IHowToProps> = ({ fromForm }) => {
  return (
    <>
      {!fromForm && (
        <Stack
          horizontal
          horizontalAlign={fromForm ? "start" : "end"}
          styles={{ root: { paddingTop: 20 } }}
        >
          <Link href={TroubleshootPDF} styles={helpEmailStyle} target="_blank">
            Log in troubleshooting
          </Link>
        </Stack>
      )}

      <Stack
        horizontal
        horizontalAlign={fromForm ? "start" : "end"}
        styles={{ root: { paddingTop: 20 } }}
      >
        <Link href={HowToPDF} styles={helpEmailStyle} target="_blank">
          The how to guide for the Vaxn8 app
        </Link>
      </Stack>
    </>
  );
};

export default HowTo;
