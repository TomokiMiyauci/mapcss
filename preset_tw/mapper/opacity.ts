import { associatePer100 } from "./_utils.ts";
import { rePositiveNumber } from "../../core/utils/regexp.ts";
import type { EntriesMapper } from "../../core/types.ts";

export const opacity: EntriesMapper = [
  [rePositiveNumber, ([, pNumber]) => associatePer100(["opacity"], pNumber)],
];
