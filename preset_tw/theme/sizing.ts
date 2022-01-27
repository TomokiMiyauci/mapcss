import { AUTO, NONE } from "../../constants.ts";
import { FIT_CONTENT, FULL, MAX_CONTENT, MIN_CONTENT } from "./constants.ts";
import type { PresetTwTheme } from "./types.ts";

export const maxWidth: PresetTwTheme["maxWidth"] = {
  0: "0rem",
  none: NONE,
  xs: "20rem",
  sm: "24rem",
  md: "28rem",
  lg: "32rem",
  xl: "36rem",
  "2xl": "42rem",
  "3xl": "48rem",
  "4xl": "56rem",
  "5xl": "64rem",
  "6xl": "72rem",
  "7xl": "80rem",
  full: FULL,
  min: MIN_CONTENT,
  max: MAX_CONTENT,
  fit: FIT_CONTENT,
  prose: "65ch",
  "screen-sm": "640px",
  "screen-md": "768px",
  "screen-lg": "1024px",
  "screen-xl": "1280px",
  "screen-2xl": "1536px",
};

export const height: PresetTwTheme["height"] = {
  px: "1px",
  [AUTO]: AUTO,
  full: FULL,
  screen: "100vh",
  min: MIN_CONTENT,
  max: MAX_CONTENT,
  fit: FIT_CONTENT,
};
