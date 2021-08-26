import { FC } from "react";
import { MessageBar, MessageBarType } from "@fluentui/react";

interface IMessageBarContainer {
  messageType: MessageBarType;
  text: string;
}

export const MessageBarContainer: FC<IMessageBarContainer> = ({
  messageType,
  text,
}) => {
  return (
    <MessageBar messageBarType={messageType} isMultiline={true}>
      {text}
    </MessageBar>
  );
};
