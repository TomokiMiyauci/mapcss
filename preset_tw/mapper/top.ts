import { associatePercent, associateRem } from "./_utils.ts";
import { reFraction, reNumeric } from "../../core/utils/regexp.ts";
import type { EntriesMapper } from "../../core/types.ts";

export const top: EntriesMapper = [
  [0, { top: "0px" }],
  ["px", { top: "1px" }],
  ["auto", { top: "auto" }],
  ["full", { top: "100%" }],

  [
    reFraction,
    ([, numerator, denominator]) =>
      associatePercent(["top"], numerator, denominator),
  ],
  [reNumeric, ([, numeric]) => associateRem(["top"], numeric)],
];
