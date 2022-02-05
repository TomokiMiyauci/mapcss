import { reBracket$, reNumeric } from "../../core/utils/regexp.ts";
import { associateRem } from "./_utils.ts";
import type { Specifier } from "../../core/types.ts";

export const pb: Specifier = [
  ["0", { "padding-bottom": "0px" }],
  ["auto", { "padding-bottom": "auto" }],
  ["px", { "padding-bottom": "1px" }],
  [reNumeric, ([, numeric]) => associateRem(["padding-bottom"], numeric)],
  [
    reBracket$,
    ([, arbitrary]) => ({ "padding-bottom": arbitrary }),
  ],
];
