import { FC, useRef, useEffect, useState } from "react";
import { Label, IconButton } from "@fluentui/react";
import "./fileInput.css";
import { icon } from "../../utils/iconsUtil";

export interface IFileInputProps {
  id: string;
  inputLabel?: string;
  name: string;
  disabled?: boolean;
  required?: boolean;
  onChange: (fileName: string, fileContent: string) => void;
  onRemove: () => void;
}

interface ISelectedFile {
  name: string;
  file: string;
}

export const FileInput: FC<IFileInputProps> = ({
  inputLabel,
  name,
  onChange,
  disabled,
  onRemove,
  required,
}): JSX.Element => {
  const innerRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<ISelectedFile | "">();

  const onFileSelected = async () => {
    if (innerRef.current && innerRef.current.files) {
      if (innerRef.current.files.length < 1) {
        setSelectedFile("");
        onRemove();
      } else {
        const currentSelection = innerRef.current.files[0];

        if (currentSelection) {
          const base64 = await readFile(currentSelection);

          setSelectedFile({
            name: innerRef.current.files[0].name,
            file: base64,
          });
          onChange(innerRef.current.files[0].name, base64);
        }
      }
    }
  };

  const clearInput = async () => {
    if (innerRef.current) {
      innerRef.current.value = "";
      setSelectedFile("");
      onRemove();
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="inputFileContainer">
      {inputLabel && <Label required={required}>{inputLabel}</Label>}
      <input
        // key={inputKey}
        ref={innerRef}
        type="file"
        id={name}
        onChange={onFileSelected}
        accept=".jpg, .png, .pdf, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
      />
      {selectedFile && (
        <IconButton
          iconProps={icon.cancel}
          title="clear"
          ariaLabel="Clear"
          onClick={clearInput}
        />
      )}

      {required && (
        <Label
          styles={{ root: { marginTop: 10, fontSize: 13, fontWeight: 400 } }}
        >
          NOTE: File attachment is mandatory
        </Label>
      )}
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
