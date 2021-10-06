import { AnimationStyles } from "@fluentui/react";

export const textInputControlStyle = {
  root: { paddingLeft: 20, width: "70%", marginBottom: 20 },
};

export const sendVerificationCodeStyle = {
  label: { fontSize: 14 },
  icon: { fontSize: 20 },
  root: { ...AnimationStyles.slideRightIn400 },
};

export const verifyBtnStyle = {
  rootHovered: {
    backgroundColor: "#38c8fc",
    borderColor: "#38c8fc",
  },
  root: {
    backgroundColor: "#5bc2e7",
    borderColor: "#5bc2e7",
    ...AnimationStyles.slideRightIn400,
  },
};

export const cancelBtnStyle = {
  root: {
    ...AnimationStyles.slideRightIn400,
  },
};

export const verificationCodeOnputStyle = {
  root: { ...AnimationStyles.slideRightIn400 },
};

export const verificationMessageBarStyle = {
  root: { ...AnimationStyles.fadeIn500, whiteSpace: "pre-line" },
};
