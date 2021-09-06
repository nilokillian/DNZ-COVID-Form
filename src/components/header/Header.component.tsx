import { FC } from "react";
import logo from "../../downer.jpg";
import { Label, Image, Separator, Stack, IStackTokens } from "@fluentui/react";

const wrapStackTokens: IStackTokens = { childrenGap: 10 };

interface IHeaderProps {
  title: string;
}

export const Header: FC<IHeaderProps> = ({ title }) => {
  return (
    <div className="formTitle">
      <Stack horizontal wrap tokens={wrapStackTokens}>
        <Image
          alt="logo"
          src={logo}
          styles={{
            image: {
              width: 185,
            },
          }}
        />

        <Stack
          verticalAlign="center"
          grow
          // styles={{ root: { marginRight: 20 } }}
        >
          <Label
            styles={{
              root: {
                textAlign: "right",
                color: "#FFFFFF",
                fontSize: 17,
                marginRight: 20,
              },
            }}
          >
            {title}
          </Label>
          <Separator styles={{ root: { marginRight: 10, marginLeft: 20 } }} />
        </Stack>
      </Stack>
    </div>
  );
};

export default Header;
