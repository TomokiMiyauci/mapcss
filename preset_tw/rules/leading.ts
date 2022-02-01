import { rePositiveNumber } from "../../core/utils/regexp.ts";
import { remBy } from "./_utils.ts";
import type { Mapper } from "../../core/types.ts";

export const leading: Mapper = [
  ["none", { "line-height": 1 }],
  ["tight", { "line-height": 1.25 }],
  ["snug", { "line-height": 1.375 }],
  ["normal", { "line-height": 1.5 }],
  ["relaxed", { "line-height": 1.625 }],
  ["loose", { "line-height": 2 }],
  [rePositiveNumber, ([, number]) => {
    return remBy(number, (rem) => ({ "line-height": rem }));
  }],
];
