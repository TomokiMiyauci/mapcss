import { reBracket$, reNumeric } from "../../core/utils/regexp.ts";
import { associateRem } from "./_utils.ts";
import { associateWith } from "../../deps.ts";
import type { Mapper } from "../../core/types.ts";

export const mx: Mapper = [
  ["0", { "margin-left": "0px", "margin-right": "0px" }],
  ["auto", { "margin-left": "auto", "margin-right": "auto" }],
  ["px", { "margin-left": "1px", "margin-right": "1px" }],
  [
    reNumeric,
    ([, numeric]) => associateRem(["margin-left", "margin-right"], numeric),
  ],
  [
    reBracket$,
    ([, arbitrary]) =>
      associateWith(["margin-left", "margin-right"], () => arbitrary),
  ],
];
