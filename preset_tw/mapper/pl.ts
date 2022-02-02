import { reBracket$, reNumeric } from "../../core/utils/regexp.ts";
import { associateRem } from "./_utils.ts";
import type { Mapper } from "../../core/types.ts";

export const pl: Mapper = [
  ["0", { "padding-left": "0px" }],
  ["auto", { "padding-left": "auto" }],
  ["px", { "padding-left": "1px" }],
  [reNumeric, ([, numeric]) => associateRem(["padding-left"], numeric)],
  [
    reBracket$,
    ([, arbitrary]) => ({ "padding-left": arbitrary }),
  ],
];
