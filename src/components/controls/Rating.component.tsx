import React from "react";
import {
  IRatingStarProps,
  IRenderFunction,
  Label,
  Rating,
  Toggle,
} from "@fluentui/react";
import injectionIcon from "../../injection.svg";

export interface IToggleControlProps {
  id: string;
  label: string;
  onText: string;
  offText: string;
  value: string;
  required: boolean;
  onChange: (id: string, value: string) => void;
}

export const RatingControl = () => {
  return (
    <div
      className="textInput"
      style={{
        padding: "10px 0px 5px",
      }}
    >
      <Label>How many shots do you have ?</Label>
      <Rating
        min={1}
        max={2}
        defaultRating={1}
        ariaLabel="Large stars"
        ariaLabelFormat="{0} of {1} stars"
        icon="RadioBtnOn"
        styles={{
          ratingStarFront: { fontSize: 20 },
          ratingStarBack: { fontSize: 20 },
        }}
        // onRenderStar={onRenderIcon}
        unselectedIcon="RadioBtnOff"
      />
    </div>
  );
};
