import { associatePercent, associateRem } from "./_utils.ts";
import { reFraction, reNumeric } from "../../core/utils/regexp.ts";
import type { EntriesMapper } from "../../core/types.ts";

export const bottom: EntriesMapper = [
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
];
