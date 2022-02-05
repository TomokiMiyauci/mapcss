import { rePositiveNumber } from "../../core/utils/regexp.ts";
import { associateNumeric } from "./_utils.ts";
import type { EntriesSpecifier } from "../../core/types.ts";

export const shrink: EntriesSpecifier = [
  ["DEFAULT", { "flex-shrink": 1 }],
  [
    rePositiveNumber,
    ([, pNumber]) => associateNumeric(["flex-shrink"], pNumber),
  ],
];
