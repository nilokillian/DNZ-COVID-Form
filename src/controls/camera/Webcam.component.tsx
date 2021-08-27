import React, { useState } from "react";
import "./cameraStyles.css";
import Webcam from "react-webcam";
import { DefaultButton } from "@fluentui/react";

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "environment",
};

export const WebcamCapture = () => {
  const [image, setImage] = useState<string | undefined>("");
  const webcamRef = React.useRef<Webcam>(null);

  const capture = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current!.getScreenshot();

      if (imageSrc) setImage(imageSrc);
    }
  }, [webcamRef]);

  const getBtntext = () => (image ? "Retake Image" : "Capture");

  const onImageClick = () => {
    if (image) {
      setImage("");
    } else {
      capture();
    }
  };

  return (
    <div className="webcam-container">
      <div className="webcam-img">
        {!image ? (
          <Webcam
            audio={false}
            height={200}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={220}
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={image} alt="img" />
        )}
      </div>
      <div className="buton-container">
        <DefaultButton
          text={getBtntext()}
          onClick={onImageClick}
          allowDisabledFocus
        />
      </div>
    </div>
  );
};
