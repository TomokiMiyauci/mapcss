import { reBracket$, reFraction, reNumeric } from "../../core/utils/regexp.ts";
import { fractionBy, remBy } from "./_utils.ts";
import type { Mapper } from "../../core/types.ts";

export const w: Mapper = [
  [0, { width: "0px" }],
  ["px", { width: "1px" }],
  ["full", { width: "100%" }],
  ["auto", { width: "auto" }],
  ["screen", { width: "100vw" }],
  ["min", { width: "min-content" }],
  ["max", { width: "max-content" }],
  ["fit", { width: "fit-content" }],
  [reNumeric, ([, numeric]) => {
    return remBy(numeric, (rem) => ({
      width: rem,
    }));
  }],
  [reFraction, ([, numerator, denominator]) => {
    return fractionBy(numerator, denominator, (percent) => ({
      width: percent,
    }));
  }],
  [reBracket$, ([, arbitrary]) => ({ width: arbitrary })],
];
