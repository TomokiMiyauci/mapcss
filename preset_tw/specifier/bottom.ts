import { associatePercent, associateRem } from "./_utils.ts";
import { reBracket$, reFraction, reNumeric } from "../../core/utils/regexp.ts";
import type { EntriesSpecifier } from "../../core/types.ts";

export const bottom: EntriesSpecifier = [
  [0, { bottom: "0px" }],
  ["px", { bottom: "1px" }],
  ["auto", { bottom: "auto" }],
  ["full", { bottom: "100%" }],

  [
    reFraction,
    ([, numerator, denominator]) =>
      associatePercent(["bottom"], numerator, denominator),
  ],
  [reNumeric, ([, numeric]) => associateRem(["bottom"], numeric)],
  [
    reBracket$,
    ([, attr]) => ({ bottom: attr }),
  ],
];
