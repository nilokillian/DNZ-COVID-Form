import React from "react";
import { TextField } from "@fluentui/react";

export interface ITextInputControlProps {
  id: string;
  label: string;
  value: string;
  required: boolean;
  onChange: (id: string, value: string) => void;
}

export const TextInputControl: React.FC<ITextInputControlProps> = ({
  id,
  label,
  value,
  required,
  onChange,
}) => {
  return (
    <div
      className="textInput"
      style={{
        padding: "20px 0px 30px",
      }}
    >
      <TextField
        required={required}
        label={label}
        value={value}
        onChange={(e) => onChange(id, (e.target as any).value)}
      />
    </div>
  );
};
