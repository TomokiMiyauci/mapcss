import { reBracket$, reNumeric } from "../../core/utils/regexp.ts";
import { associateRem } from "./_utils.ts";
import type { Mapper } from "../../core/types.ts";

export const m: Mapper = [
  ["0", { margin: "0px" }],
  ["auto", { margin: "auto" }],
  ["px", { margin: "1px" }],
  [reNumeric, ([, numeric]) => associateRem(["margin"], numeric)],
  [reBracket$, ([, arbitrary]) => ({ margin: arbitrary })],
];
