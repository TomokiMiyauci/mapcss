import { associatePercent, associateRem } from "./_utils.ts";
import { reBracket$, reFraction, reNumeric } from "../../core/utils/regexp.ts";
import type { EntriesMapper } from "../../core/types.ts";

export const right: EntriesMapper = [
  [0, { right: "0px" }],
  ["px", { right: "1px" }],
  ["auto", { right: "auto" }],
  ["full", { right: "100%" }],

  [
    reFraction,
    ([, numerator, denominator]) =>
      associatePercent(["right"], numerator, denominator),
  ],
  [reNumeric, ([, numeric]) => associateRem(["right"], numeric)],
  [
    reBracket$,
    ([, attr]) => ({ right: attr }),
  ],
];
