import { rePositiveNumber } from "../../core/utils/regexp.ts";
import { associateNumeric } from "./_utils.ts";
import type { EntriesSpecifier } from "../../core/types.ts";

export const grow: EntriesSpecifier = [
  ["DEFAULT", { "flex-grow": 1 }],
  [rePositiveNumber, ([, pNumber]) => associateNumeric(["flex-grow"], pNumber)],
];
