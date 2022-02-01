import type { Mapper } from "../../core/types.ts";

const roundedMap = {
  DEFAULT: "0.25rem",
  none: "0px",
  sm: "0.125rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
  full: "9999px",
};

const BORDER_RADIUS = "border-radius";
const BORDER_TOP_LEFT_RADIUS = "border-top-left-radius";
const BORDER_TOP_RIGHT_RADIUS = "border-top-right-radius";
const BORDER_BOTTOM_RIGHT_RADIUS = "border-bottom-right-radius";
const BORDER_BOTTOM_LEFT_RADIUS = "border-bottom-left-radius";
export const rounded: Mapper = [
  ["DEFAULT", { [BORDER_RADIUS]: roundedMap["DEFAULT"] }],
  ["none", { [BORDER_RADIUS]: roundedMap["none"] }],
  ["sm", { [BORDER_RADIUS]: roundedMap["sm"] }],
  ["md", { [BORDER_RADIUS]: roundedMap["md"] }],
  ["lg", { [BORDER_RADIUS]: roundedMap["lg"] }],
  ["xl", { [BORDER_RADIUS]: roundedMap["xl"] }],
  ["2xl", { [BORDER_RADIUS]: roundedMap["2xl"] }],
  ["3xl", { [BORDER_RADIUS]: roundedMap["3xl"] }],
  ["full", { [BORDER_RADIUS]: roundedMap["full"] }],
  ["t", {
    DEFAULT: {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["DEFAULT"],
      [BORDER_TOP_RIGHT_RADIUS]: roundedMap["DEFAULT"],
    },
    none: {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["none"],
      [BORDER_TOP_RIGHT_RADIUS]: roundedMap["none"],
    },
    sm: {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["sm"],
      [BORDER_TOP_RIGHT_RADIUS]: roundedMap["sm"],
    },
    md: {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["md"],
      [BORDER_TOP_RIGHT_RADIUS]: roundedMap["md"],
    },
    lg: {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["lg"],
      [BORDER_TOP_RIGHT_RADIUS]: roundedMap["lg"],
    },
    xl: {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["xl"],
      [BORDER_TOP_RIGHT_RADIUS]: roundedMap["xl"],
    },
    "2xl": {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["2xl"],
      [BORDER_TOP_RIGHT_RADIUS]: roundedMap["2xl"],
    },
    "3xl": {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["3xl"],
      [BORDER_TOP_RIGHT_RADIUS]: roundedMap["3xl"],
    },
    full: {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["full"],
      [BORDER_TOP_RIGHT_RADIUS]: roundedMap["full"],
    },
  }],
  ["r", {
    DEFAULT: {
      [BORDER_TOP_RIGHT_RADIUS]: roundedMap["DEFAULT"],
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["DEFAULT"],
    },
    none: {
      [BORDER_TOP_RIGHT_RADIUS]: roundedMap["none"],
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["none"],
    },
    sm: {
      [BORDER_TOP_RIGHT_RADIUS]: roundedMap["sm"],
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["sm"],
    },
    md: {
      [BORDER_TOP_RIGHT_RADIUS]: roundedMap["md"],
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["md"],
    },
    lg: {
      [BORDER_TOP_RIGHT_RADIUS]: roundedMap["lg"],
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["lg"],
    },
    xl: {
      [BORDER_TOP_RIGHT_RADIUS]: roundedMap["xl"],
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["xl"],
    },
    "2xl": {
      [BORDER_TOP_RIGHT_RADIUS]: roundedMap["2xl"],
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["2xl"],
    },
    "3xl": {
      [BORDER_TOP_RIGHT_RADIUS]: roundedMap["3xl"],
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["3xl"],
    },
    full: {
      [BORDER_TOP_RIGHT_RADIUS]: roundedMap["full"],
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["full"],
    },
  }],
  ["b", {
    DEFAULT: {
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["DEFAULT"],
      [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["DEFAULT"],
    },
    none: {
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["none"],
      [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["none"],
    },
    sm: {
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["sm"],
      [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["sm"],
    },
    md: {
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["md"],
      [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["md"],
    },
    lg: {
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["lg"],
      [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["lg"],
    },
    xl: {
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["xl"],
      [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["xl"],
    },
    "2xl": {
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["2xl"],
      [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["2xl"],
    },
    "3xl": {
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["3xl"],
      [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["3xl"],
    },
    full: {
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["full"],
      [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["full"],
    },
  }],
  ["l", {
    DEFAULT: {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["DEFAULT"],
      [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["DEFAULT"],
    },
    none: {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["none"],
      [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["none"],
    },
    sm: {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["sm"],
      [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["sm"],
    },
    md: {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["md"],
      [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["md"],
    },
    lg: {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["lg"],
      [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["lg"],
    },
    xl: {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["xl"],
      [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["xl"],
    },
    "2xl": {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["2xl"],
      [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["2xl"],
    },
    "3xl": {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["3xl"],
      [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["3xl"],
    },
    full: {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["full"],
      [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["full"],
    },
  }],
  ["tl", {
    DEFAULT: {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["DEFAULT"],
    },
    none: {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["none"],
    },
    sm: {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["sm"],
    },
    md: {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["md"],
    },
    lg: {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["lg"],
    },
    xl: {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["xl"],
    },
    "2xl": {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["2xl"],
    },
    "3xl": {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["3xl"],
    },
    full: {
      [BORDER_TOP_LEFT_RADIUS]: roundedMap["full"],
    },
  }],
  ["tr", {
    DEFAULT: { [BORDER_TOP_RIGHT_RADIUS]: roundedMap["DEFAULT"] },
    none: { [BORDER_TOP_RIGHT_RADIUS]: roundedMap["none"] },
    sm: { [BORDER_TOP_RIGHT_RADIUS]: roundedMap["sm"] },
    md: { [BORDER_TOP_RIGHT_RADIUS]: roundedMap["md"] },
    lg: { [BORDER_TOP_RIGHT_RADIUS]: roundedMap["lg"] },
    xl: { [BORDER_TOP_RIGHT_RADIUS]: roundedMap["xl"] },
    "2xl": { [BORDER_TOP_RIGHT_RADIUS]: roundedMap["2xl"] },
    "3xl": { [BORDER_TOP_RIGHT_RADIUS]: roundedMap["3xl"] },
    full: { [BORDER_TOP_RIGHT_RADIUS]: roundedMap["full"] },
  }],
  [
    "bl",
    {
      DEFAULT: {
        [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["DEFAULT"],
      },
      none: {
        [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["none"],
      },
      sm: {
        [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["sm"],
      },
      md: {
        [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["md"],
      },
      lg: {
        [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["lg"],
      },
      xl: {
        [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["xl"],
      },
      "2xl": { [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["2xl"] },
      "3xl": { [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["3xl"] },
      full: {
        [BORDER_BOTTOM_LEFT_RADIUS]: roundedMap["full"],
      },
    },
  ],
  ["br", {
    DEFAULT: {
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["DEFAULT"],
    },
    none: {
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["none"],
    },
    sm: {
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["sm"],
    },
    md: {
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["md"],
    },
    lg: {
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["lg"],
    },
    xl: {
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["xl"],
    },
    "2xl": {
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["2xl"],
    },
    "3xl": {
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["3xl"],
    },
    full: {
      [BORDER_BOTTOM_RIGHT_RADIUS]: roundedMap["full"],
    },
  }],
];
