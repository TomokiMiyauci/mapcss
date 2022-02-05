import { reBracket$, reNumeric } from "../../core/utils/regexp.ts";
import { associateRem } from "./_utils.ts";
import { associateWith } from "../../deps.ts";
import type { Specifier } from "../../core/types.ts";

export const py: Specifier = [
  ["0", { "padding-top": "0px", "padding-bottom": "0px" }],
  ["auto", { "padding-top": "auto", "padding-bottom": "auto" }],
  ["px", { "padding-top": "1px", "padding-bottom": "1px" }],
  [
    reNumeric,
    ([, numeric]) => associateRem(["padding-top", "padding-bottom"], numeric),
  ],
  [
    reBracket$,
    ([, arbitrary]) =>
      associateWith(["padding-top", "padding-bottom"], () => arbitrary),
  ],
];
