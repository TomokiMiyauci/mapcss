import { reNumeric } from "../../core/utils/regexp.ts";
import { associatePx } from "./_utils.ts";
import type { Mapper } from "../../core/types.ts";

export const m: Mapper = [
  ["0", { margin: "0px" }],
  ["auto", { margin: "auto" }],
  ["px", { margin: "1px" }],
  [reNumeric, ([, numeric]) => associatePx(numeric, ["margin"])],
];
