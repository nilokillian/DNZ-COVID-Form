import { AnimationStyles } from "@fluentui/react";

export const containerStyle = {
  root: {
    minHeight: 400,
    alignItems: "center",
    padding: 20,
    ...AnimationStyles.slideRightIn400,
  },
};

export const iconStyle = {
  root: {
    fontSize: 38,
    color: "#95c94e",
    marginRight: 10,
    cursor: "pointer",
  },
};

export const labelStyle = {
  root: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
  },
};
