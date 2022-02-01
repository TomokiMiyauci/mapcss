import { reNumeric } from "../../core/utils/regexp.ts";
import { associatePx } from "./_utils.ts";
import type { Mapper } from "../../core/types.ts";

export const ml: Mapper = [
  ["0", { "margin-left": "0px" }],
  ["auto", { "margin-left": "auto" }],
  ["px", { "margin-left": "1px" }],
  [reNumeric, ([, numeric]) => associatePx(numeric, ["margin-left"])],
];
