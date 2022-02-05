import {
  reBracket$,
  reNumeric,
  reSlashNumber,
} from "../../core/utils/regexp.ts";
import { associatePercent, associateRem } from "./_utils.ts";
import type { EntriesSpecifier } from "../../core/types.ts";

export const basis: EntriesSpecifier = [
  [0, { "flex-basis": "0px" }],
  ["px", { "flex-basis": "1px" }],
  ["auto", { "flex-basis": "auto" }],
  ["full", {
    "flex-basis": "100%",
  }],
  [reNumeric, ([, numeric]) => associateRem(["flex-basis"], numeric)],
  [
    reSlashNumber,
    ([, numerator, denominator]) =>
      associatePercent(["flex-basis"], numerator, denominator),
  ],
  [reBracket$, ([, arbitrary]) => ({ "flex-basis": arbitrary })],
];
