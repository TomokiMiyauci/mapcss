import { fractionBy } from "./_utils.ts";
import { reFraction } from "../../core/utils/regexp.ts";
import type { Mapper } from "../../core/types.ts";

export const left: Mapper = [
  [0, { left: "0px" }],
  ["px", { left: "1px" }],
  ["auto", { left: "auto" }],
  ["full", { left: "100%" }],

  [reFraction, ([, numerator, denominator]) => {
    return fractionBy(numerator, denominator, (percent) => ({
      left: percent,
    }));
  }],
];
