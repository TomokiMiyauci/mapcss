import { rePositiveNumber } from "../../core/utils/regexp.ts";
import { matcher } from "./_utils.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import type { Specifier } from "../../core/types.ts";

export const row: Specifier = [
  ["auto", { "grid-row": "auto" }],
  ["span", [
    ["full", { "grid-row": "1/-1" }],
    [
      rePositiveNumber,
      ([, pNumber]) =>
        parseNumeric(pNumber).map((number) => `span ${number}/span ${number}`)
          .match(matcher("grid-row")),
    ],
  ]],
  ["start", [
    ["auto", { "grid-row-start": "auto" }],
    [
      rePositiveNumber,
      ([, pNumber]) => parseNumeric(pNumber).match(matcher("grid-row-start")),
    ],
  ]],
  ["end", [
    ["auto", { "grid-row-end": "auto" }],
    [
      rePositiveNumber,
      ([, pNumber]) => parseNumeric(pNumber).match(matcher("grid-row-end")),
    ],
  ]],
];
