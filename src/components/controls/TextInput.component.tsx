import React from "react";
import { TextField } from "@fluentui/react";

export interface ITextInputControlProps {
  id: string;
  label: string;
  disabled: boolean;
  value: string | undefined;
  required?: boolean | undefined;
  onChange: (id: string, value: string) => void;
  multipleLine?: boolean | undefined;
  rows?: number | undefined;
}

export const TextInputControl: React.FC<ITextInputControlProps> = ({
  id,
  label,
  value,
  required,
  onChange,
  disabled,
  multipleLine,
  rows,
}) => {
  return (
    <div
      className="textInput"
      style={{
        padding: "10px 0px 5px",
      }}
    >
      {multipleLine ? (
        <TextField
          required={required}
          disabled={disabled}
          label={label}
          value={value}
          onChange={(e) => onChange(id, (e.target as any).value)}
          multiple={multipleLine}
          rows={rows}
          resizable={multipleLine}
        />
      ) : (
        <TextField
          required={required}
          disabled={disabled}
          label={label}
          value={value}
          onChange={(e) => onChange(id, (e.target as any).value)}
        />
      )}
    </div>
  );
};
