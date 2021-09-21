import { AnimationStyles } from "@fluentui/react";

export const privacyStatementLinkStyle = {
  root: {
    fontSize: 14,
    textDecoration: "none",
    selectors: {
      [":hover .ms-Link"]: { textDecoration: "none" },
      [":hover"]: { textDecoration: "none" },
    },
  },
};

export const privacyStatementMessageBarStyle = {
  root: { ...AnimationStyles.fadeIn500 },
};
