import React from "react";
import { Label } from "@fluentui/react";
import "./fileInput.css";

export interface IFileInputProps {
  id: string;
  inputLabel?: string;
  name: string;
  disabled?: boolean;
  onChange: (id: string, selectedFile: string) => void;
}

export const FileInput: React.FC<IFileInputProps> = ({
  id,
  inputLabel,
  name,
  onChange,
  disabled,
}): JSX.Element => {
  const innerRef = React.useRef<any>(null);

  React.useEffect(() => {
    const curentRef = innerRef.current;
    if (curentRef) {
      const addFileToSpan = () => {
        const label = curentRef.nextElementSibling;
        const fileName = curentRef.files[0].name;
        if (fileName) label.querySelector("span").innerHTML = fileName;
      };

      curentRef.addEventListener("change", addFileToSpan);

      return () => {
        curentRef.removeEventListener("change", addFileToSpan);
      };
    }
  }, [innerRef]);

  const onFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(await readFile(e.target.files![0]), name);
  };

  const getInputClass = () =>
    disabled ? `inputfile inputfile6 inputDisabled` : `inputfile inputfile6`;

  return (
    <div className="inputFileContainer">
      {inputLabel && <Label>{inputLabel}</Label>}

      <input
        ref={innerRef}
        onChange={(e) => onFileSelect(e)}
        type="file"
        name={`${name}[]`}
        id={name}
        className={getInputClass()}
        data-multiple-caption="{count} files selected"
        multiple
        disabled={false}
      />

      {/* <div className={styles.inputDisabled}></div> */}
      <label htmlFor={name}>
        <span className="fileName"></span>
      </label>
    </div>
  );
};
const readFile = (file: File): Promise<string> => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onerror = () => {
      reader.abort();
      reject(new DOMException("Problem parsing input file."));
    };
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.readAsText(file);
  });
};
