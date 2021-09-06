import React from "react";
import { TextField } from "@fluentui/react";

export interface ITextInputControlProps {
  id: string;
  label: string;
  disabled: boolean;
  value: string | undefined;
  placeholder?: string | undefined;
  required?: boolean | undefined;
  onChange: (id: string, value: string) => void;
  multipleLine?: boolean | undefined;
  rows?: number | undefined;
  underlined?: boolean;
  errorMessage?: string;
  styles?: {};
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
  underlined,
  placeholder,
  styles,
  errorMessage,
}) => {
  return (
    <div
      className="textInput"
      style={{
        padding: "10px 0px 5px",
      }}
    >
      {underlined ? (
        <TextField
          required={required}
          disabled={disabled}
          label={label}
          value={value}
          onChange={(e) => onChange(id, (e.target as any).value)}
          placeholder={placeholder}
          styles={styles}
          errorMessage={errorMessage}
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
