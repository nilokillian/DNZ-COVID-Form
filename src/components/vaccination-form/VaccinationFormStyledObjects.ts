import { AnimationStyles } from "@fluentui/react";

export const vaccinationFormContainerStyle = {
  root: {
    ...AnimationStyles.fadeIn500,
    minHeight: 300,
  },
};

export const submitFromBtnStyle = {
  rootHovered: {
    backgroundColor: "#38c8fc",
    borderColor: "#38c8fc",
  },
  root: {
    backgroundColor: "#5bc2e7",
    width: 200,

    borderColor: "#5bc2e7",
  },
};

export const errorMessageBarStyle = {
  root: { marginBottom: 20 },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
};
