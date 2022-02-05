import { rePositiveNumber } from "../../core/utils/regexp.ts";
import { associateNumeric } from "./_utils.ts";
import type { EntriesSpecifier } from "../../core/types.ts";

export const order: EntriesSpecifier = [
  ["first", { order: -9999 }],
  ["last", { order: 9999 }],
  ["none", { order: 0 }],
  [
    rePositiveNumber,
    ([, pNumber]) => associateNumeric(["order"], pNumber),
  ],
];
