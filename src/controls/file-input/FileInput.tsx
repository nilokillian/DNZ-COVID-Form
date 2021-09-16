import React, { FC, useEffect, useRef, useState } from "react";
import { Label, ActionButton, Stack } from "@fluentui/react";
import "./fileInput.css";
import { icon } from "../../utils/iconsUtil";

export interface IFileInputProps {
  id: string;
  inputLabel?: string;
  name: string;
  disabled?: boolean;
  onChange: (id: string, selectedFile: string) => void;
}

export const FileInput: FC<IFileInputProps> = ({
  inputLabel,
  name,
  onChange,
  disabled,
}): JSX.Element => {
  const innerRef = useRef<HTMLInputElement>(null);

  const [inputKey, setInputKey] = useState(() => Math.random().toString(36));

  const [fileSelected, setFileSelected] = useState(false);

  useEffect(() => {
    const curentRef = innerRef.current;
    if (curentRef && curentRef.files) {
      const addFileToSpan = () => {
        if (curentRef && curentRef.files && curentRef.files.length > 0) {
          const label = curentRef.nextElementSibling;
          const fileName = curentRef.files[0].name;

          if (fileName && label) {
            const fileNameSpan = label.querySelector("span");
            if (fileNameSpan) {
              fileNameSpan.innerHTML = fileName;
            }
          }
        }
      };

      curentRef.addEventListener("change", addFileToSpan);

      return () => {
        curentRef.removeEventListener("change", addFileToSpan);
      };
    }
  }, [innerRef, inputKey]);

  const onFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const isSelected = e.target.files && e.target.files.length < 1;
    const curentRef = innerRef.current;
    if (curentRef && e.target && e.target.files && e.target.files.length < 1) {
      const label = curentRef.nextElementSibling;

      if (label) {
        const fileNameSpan = label.querySelector("span");
        if (fileNameSpan) fileNameSpan.innerHTML = "";
      }
    }

    setFileSelected(!isSelected);
  };

  const clearInput = async () => {
    if (innerRef.current && innerRef.current.files) {
      const selectedFile = innerRef.current.files[0];
      const randomString = Math.random().toString(36);
      const curentRef = innerRef.current;
      if (curentRef) {
        const label = curentRef.nextElementSibling;
        setInputKey(() => randomString);
        if (label) {
          const fileNameSpan = label.querySelector("span");
          if (fileNameSpan) fileNameSpan.innerHTML = "";
        }

        const file = await readFile(selectedFile);
        setFileSelected(false);
        onChange(selectedFile.name, file);
      }
    }
  };

  const getInputClass = () =>
    disabled ? `inputfile inputfile6 inputDisabled` : `inputfile inputfile6`;

  return (
    <div className="inputFileContainer">
      {inputLabel && <Label>{inputLabel}</Label>}

      <input
        key={inputKey}
        ref={innerRef}
        onChange={(e) => onFileSelect(e)}
        type="file"
        name={`${name}[]`}
        id={name}
        multiple
        className={getInputClass()}
        // data-multiple-caption="{count} files selected"
        accept=".jpg, .png, .pdf, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
      />

      <Stack horizontal>
        <label htmlFor={name} className="file-name-contailer">
          <span className="file-name"></span>
        </label>
        <ActionButton
          iconProps={icon.save}
          styles={{ icon: { fontSize: 25 }, root: { height: 30 } }}
          allowDisabledFocus
          disabled={!fileSelected}
          onClick={clearInput}
        >
          Save
        </ActionButton>
      </Stack>
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
      const res: any = reader.result;
      resolve(res);
    };
    reader.readAsDataURL(file);
    // reader.readAsText(file);
  });
};
