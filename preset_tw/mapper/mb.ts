import { reBracket$, reNumeric } from "../../core/utils/regexp.ts";
import { associateRem } from "./_utils.ts";
import type { Mapper } from "../../core/types.ts";

export const mb: Mapper = [
  ["0", { "margin-bottom": "0px" }],
  ["auto", { "margin-bottom": "auto" }],
  ["px", { "margin-bottom": "1px" }],
  [reNumeric, ([, numeric]) => associateRem(["margin-bottom"], numeric)],
  [
    reBracket$,
    ([, arbitrary]) => ({ "margin-bottom": arbitrary }),
  ],
];
