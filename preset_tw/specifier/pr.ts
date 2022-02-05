import { reBracket$, reNumeric } from "../../core/utils/regexp.ts";
import { associateRem } from "./_utils.ts";
import type { Specifier } from "../../core/types.ts";

export const pr: Specifier = [
  ["0", { "padding-right": "0px" }],
  ["auto", { "padding-right": "auto" }],
  ["px", { "padding-right": "1px" }],
  [reNumeric, ([, numeric]) => associateRem(["padding-right"], numeric)],
  [
    reBracket$,
    ([, arbitrary]) => ({ "padding-right": arbitrary }),
  ],
];
