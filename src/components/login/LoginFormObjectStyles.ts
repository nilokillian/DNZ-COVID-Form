import { AnimationStyles } from "@fluentui/react";

export const formBodyStackStyle = {
  root: { ...AnimationStyles.fadeIn400 },
};

export const errorMessageStyle = {
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
};

export const loginBtnStyle = {
  rootHovered: {
    backgroundColor: "#38c8fc",
    borderColor: "#38c8fc",
  },
  root: {
    backgroundColor: "#5bc2e7",
    borderColor: "#5bc2e7",
    width: 200,
    // selectors: {
    //   // [":hover"]: {
    //   //   backgroundColor: isDisabled ? "rgb(243, 242, 241)" : "#5bc2e7",
    //   // },
    //   [":hover"]: {
    //     backgroundColor: "#5bc2e7",
    //   },
    //   [":hover .ms-Button"]: { backgroundColor: "#5bc2e7" },
    // },
    ...AnimationStyles.fadeIn400,
  },
};

export const helpEmailStyle = {
  root: { textDecoration: "none", fontSize: 14 },
};
