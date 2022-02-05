import { reBracket$, reNumeric } from "../../core/utils/regexp.ts";
import { associateRem } from "./_utils.ts";
import type { Specifier } from "../../core/types.ts";

export const ml: Specifier = [
  ["0", { "margin-left": "0px" }],
  ["auto", { "margin-left": "auto" }],
  ["px", { "margin-left": "1px" }],
  [reNumeric, ([, numeric]) => associateRem(["margin-left"], numeric)],
  [
    reBracket$,
    ([, arbitrary]) => ({ "margin-left": arbitrary }),
  ],
];
