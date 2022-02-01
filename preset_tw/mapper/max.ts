import { reNumeric } from "../../core/utils/regexp.ts";
import { remBy } from "./_utils.ts";
import type { Mapper } from "../../core/types.ts";

export const max: Mapper = {
  w: {
    0: { "max-width": "0rem" },
    none: { "max-width": "none" },
    xs: { "max-width": "20rem" },
    sm: { "max-width": "24rem" },
    md: { "max-width": "28rem" },
    lg: { "max-width": "32rem" },
    xl: { "max-width": "36rem" },
    "2xl": { "max-width": "42rem" },
    "3xl": { "max-width": "48rem" },
    "4xl": { "max-width": "56rem" },
    "5xl": { "max-width": "64rem" },
    "6xl": { "max-width": "72rem" },
    "7xl": { "max-width": "80rem" },
    full: { "max-width": "100%" },
    min: { "max-width": "min-content" },
    max: { "max-width": "max-content" },
    fit: { "max-width": "fit-content" },
    prose: { "max-width": "65ch" },
    screen: {
      sm: { "max-width": "640px" },
      md: { "max-width": "768px" },
      lg: { "max-width": "1024px" },
      xl: { "max-width": "1280px" },
      "2xl": { "max-width": "1536px" },
    },
  },
  h: [
    [reNumeric, ([, numeric]) => {
      return remBy(numeric, (rem) => ({
        "max-height": rem,
      }));
    }],
    [0, { "max-height": "0px" }],
    ["px", { "max-height": "1px" }],
    ["full", { "max-height": "100%" }],
    ["screen", { "max-height": "100vh" }],
    ["min", { "max-height": "min-content" }],
    ["max", { "max-height": "max-content" }],
    ["fit", { "max-height": "fit-content" }],
  ],
};
