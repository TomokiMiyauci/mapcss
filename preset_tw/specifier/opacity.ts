import { associatePer100 } from "./_utils.ts";
import { rePositiveNumber } from "../../core/utils/regexp.ts";
import type { EntriesSpecifier } from "../../core/types.ts";

export const opacity: EntriesSpecifier = [
  [rePositiveNumber, ([, pNumber]) => associatePer100(["opacity"], pNumber)],
];
