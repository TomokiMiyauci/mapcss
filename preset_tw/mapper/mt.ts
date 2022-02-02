import { reBracket$, reNumeric } from "../../core/utils/regexp.ts";
import { associateRem } from "./_utils.ts";
import type { Mapper } from "../../core/types.ts";

export const mt: Mapper = [
  ["0", { "margin-top": "0px" }],
  ["auto", { "margin-top": "auto" }],
  ["px", { "margin-top": "1px" }],
  [reNumeric, ([, numeric]) => associateRem(["margin-top"], numeric)],
  [
    reBracket$,
    ([, arbitrary]) => ({ "margin-top": arbitrary }),
  ],
];
