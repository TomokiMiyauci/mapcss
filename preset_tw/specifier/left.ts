import { associatePercent, associateRem } from "./_utils.ts";
import { reBracket$, reFraction, reNumeric } from "../../core/utils/regexp.ts";
import type { EntriesSpecifier } from "../../core/types.ts";

export const left: EntriesSpecifier = [
  [0, { left: "0px" }],
  ["px", { left: "1px" }],
  ["auto", { left: "auto" }],
  ["full", { left: "100%" }],

  [
    reFraction,
    ([, numerator, denominator]) =>
      associatePercent(["left"], numerator, denominator),
  ],
  [reNumeric, ([, numeric]) => associateRem(["left"], numeric)],
  [
    reBracket$,
    ([, attr]) => ({ left: attr }),
  ],
];
