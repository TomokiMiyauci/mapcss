import { reBracket$, reNumeric } from "../../core/utils/regexp.ts";
import { associateRem } from "./_utils.ts";
import type { Mapper } from "../../core/types.ts";

export const p: Mapper = [
  ["0", { padding: "0px" }],
  ["auto", { padding: "auto" }],
  ["px", { padding: "1px" }],
  [reNumeric, ([, numeric]) => associateRem(["padding"], numeric)],
  [reBracket$, ([, arbitrary]) => ({ padding: arbitrary })],
];
