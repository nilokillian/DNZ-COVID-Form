import { AnimationStyles } from "@fluentui/react";

export const vaccinationFormContainerStyle = {
  root: {
    ...AnimationStyles.fadeIn500,
    width: "70%",
    paddingLeft: 20,
    minHeight: 300,
    marginTop: 20,
  },
};

export const submitFromBtnStyle = {
  root: {
    backgroundColor: "#5bc2e7",
    width: 200,
    height: 40,
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
