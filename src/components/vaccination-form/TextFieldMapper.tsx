import { TextField } from "@fluentui/react";
import { FC } from "react";

export interface ITextFieldMapperProps {
  data: { [key: string]: string };
}

export const TextFieldMapper: FC<ITextFieldMapperProps> = ({ data }) => {
  const getJSX = () => {
    const entries = Object.entries(data);
    console.log("data", data);
    console.log("entries", entries);
    return entries.map((value) => {
      return (
        <TextField
          key={value[0]}
          defaultValue={value[1]}
          disabled
          ariaLabel={value[0]}
          styles={{ field: { color: "#323130" } }}
        />
      );
    });
  };

  return <div>{getJSX()}</div>;
};
