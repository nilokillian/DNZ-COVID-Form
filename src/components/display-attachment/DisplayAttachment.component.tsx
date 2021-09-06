import { Icon, Stack, Text } from "@fluentui/react";
import { FC } from "react";
import { IAttachment } from "../../context/App.context";
import { icon } from "../../utils/iconsUtil";

import "./display-attachment.style.css";

export interface IDisplayAttachmentProps {
  data: IAttachment[];
  onRemove: (name: string) => void;
}

export const DisplayAttachment: FC<IDisplayAttachmentProps> = ({
  data,
  onRemove,
}) => {
  return (
    <div className="attachment-container">
      {data.map((item, index) => (
        <Stack key={index + "_attach"} horizontal>
          <Text variant="smallPlus" className="attachment-name">
            {item.name}
          </Text>
          <Icon
            iconName={icon.cancel.iconName}
            styles={{
              root: { padding: 5, cursor: "pointer" },
            }}
            onClick={() => onRemove(item.name)}
          />
        </Stack>
      ))}
    </div>
  );
};
