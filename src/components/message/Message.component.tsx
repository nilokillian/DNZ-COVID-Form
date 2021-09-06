import { FC } from "react";
import { MessageBar, MessageBarType } from "@fluentui/react";

interface IMessageBarContainer {
  messageType: MessageBarType;
  onDismiss?: () => void;
}

export const MessageBarContainer: FC<IMessageBarContainer> = ({
  messageType,
  onDismiss,
  children,
}) => {
  return (
    <MessageBar
      messageBarType={messageType}
      isMultiline={true}
      onDismiss={onDismiss}
      dismissButtonAriaLabel="Close"
    >
      {children}
    </MessageBar>
  );
};
