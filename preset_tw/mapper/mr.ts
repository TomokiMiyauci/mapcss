import { reBracket$, reNumeric } from "../../core/utils/regexp.ts";
import { associateRem } from "./_utils.ts";
import type { Mapper } from "../../core/types.ts";

export const mr: Mapper = [
  ["0", { "margin-right": "0px" }],
  ["auto", { "margin-right": "auto" }],
  ["px", { "margin-right": "1px" }],
  [reNumeric, ([, numeric]) => associateRem(["margin-right"], numeric)],
  [
    reBracket$,
    ([, arbitrary]) => ({ "margin-right": arbitrary }),
  ],
];
