import { reBracket$, reNumeric } from "../../core/utils/regexp.ts";
import { associateRem } from "./_utils.ts";
import { associateWith } from "../../deps.ts";
import type { Mapper } from "../../core/types.ts";

export const px: Mapper = [
  ["0", { "padding-left": "0px", "padding-right": "0px" }],
  ["auto", { "padding-left": "auto", "padding-right": "auto" }],
  ["px", { "padding-left": "1px", "padding-right": "1px" }],
  [
    reNumeric,
    ([, numeric]) => associateRem(["padding-left", "padding-right"], numeric),
  ],
  [
    reBracket$,
    ([, arbitrary]) =>
      associateWith(["padding-left", "padding-right"], () => arbitrary),
  ],
];
