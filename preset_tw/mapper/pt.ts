import { reBracket$, reNumeric } from "../../core/utils/regexp.ts";
import { associateRem } from "./_utils.ts";
import type { Mapper } from "../../core/types.ts";

export const pt: Mapper = [
  ["0", { "padding-top": "0px" }],
  ["auto", { "padding-top": "auto" }],
  ["px", { "padding-top": "1px" }],
  [reNumeric, ([, numeric]) => associateRem(["padding-top"], numeric)],
  [
    reBracket$,
    ([, arbitrary]) => ({ "padding-top": arbitrary }),
  ],
];
