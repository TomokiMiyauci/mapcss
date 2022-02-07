import { reNumeric } from "../../core/utils/regexp.ts";
import { associateRem } from "./_utils.ts";
import type { EntriesSpecifier } from "../../core/types.ts";

export const indent: EntriesSpecifier = [
  [0, { "text-indent": "0px" }],
  ["px", { "text-indent": "1px" }],
  [reNumeric, ([, numeric]) => associateRem(["text-indent"], numeric)],
];
