import { reBracket$, reNumeric } from "../../core/utils/regexp.ts";
import { associateRem } from "./_utils.ts";
import { associateWith } from "../../deps.ts";
import type { Mapper } from "../../core/types.ts";

export const my: Mapper = [
  ["0", { "margin-top": "0px", "margin-bottom": "0px" }],
  ["auto", { "margin-top": "auto", "margin-bottom": "auto" }],
  ["px", { "margin-top": "1px", "margin-bottom": "1px" }],
  [
    reNumeric,
    ([, numeric]) => associateRem(["margin-top", "margin-bottom"], numeric),
  ],
  [
    reBracket$,
    ([, arbitrary]) =>
      associateWith(["margin-top", "margin-bottom"], () => arbitrary),
  ],
];
