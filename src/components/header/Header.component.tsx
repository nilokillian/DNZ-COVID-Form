import { FC } from "react";
import logo from "../../downer.jpg";
import { Label, Image, Separator, Stack, IStackTokens } from "@fluentui/react";
import {
  headerSepartorStyle,
  headerTitleStyle,
  headerWrapperStyle,
} from "./HeaderStyledObjects";

const wrapStackTokens: IStackTokens = { childrenGap: 10 };

interface IHeaderProps {
  title: string;
}

export const Header: FC<IHeaderProps> = ({ title }): JSX.Element => {
  return (
    <div className="header-container">
      <Stack horizontal wrap tokens={wrapStackTokens}>
        <Image alt="logo" src={logo} styles={headerWrapperStyle} />
        <Stack verticalAlign="center" grow>
          <Label styles={headerTitleStyle}>{title}</Label>
          <Separator styles={headerSepartorStyle} />
        </Stack>
      </Stack>
    </div>
  );
};

export default Header;
