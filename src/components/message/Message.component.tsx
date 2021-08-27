import { FC } from "react";
import { MessageBar, MessageBarType } from "@fluentui/react";

interface IMessageBarContainer {
  messageType: MessageBarType;
}

export const MessageBarContainer: FC<IMessageBarContainer> = ({
  messageType,
  children,
}) => {
  return (
    <MessageBar messageBarType={messageType} isMultiline={true}>
      {children}
    </MessageBar>
  );
};
