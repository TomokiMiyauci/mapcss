import { reFraction, reNumeric } from "../../core/utils/regexp.ts";
import { fractionBy, remBy } from "./_utils.ts";
import type { Mapper } from "../../core/types.ts";

export const h: Mapper = [
  [0, { height: "0px" }],
  ["px", { height: "1px" }],
  ["auto", { height: "auto" }],
  ["full", { height: "100%" }],
  ["screen", { height: "100vh" }],
  ["min", { height: "min-content" }],
  ["max", { height: "max-content" }],
  ["fit", { height: "fit-content" }],
  [reNumeric, ([, numeric]) => {
    return remBy(numeric, (rem) => ({
      height: rem,
    }));
  }],
  [reFraction, ([, numerator, denominator]) => {
    return fractionBy(numerator, denominator, (percent) => ({
      height: percent,
    }));
  }],
];
