import { re$PositiveNumber } from "../../core/utils/regexp.ts";
import { matcher } from "./_utils.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import type { Specifier } from "../../core/types.ts";

export const col: Specifier = [
  ["auto", { "grid-column": "auto" }],
  ["span", [
    ["full", { "grid-column": "1/-1" }],
    [
      re$PositiveNumber,
      ([, pNumber]) =>
        parseNumeric(pNumber).map((number) => `span ${number}/span ${number}`)
          .match(matcher("grid-column")),
    ],
  ]],
  ["start", [
    ["auto", { "grid-column-start": "auto" }],
    [
      re$PositiveNumber,
      ([, pNumber]) =>
        parseNumeric(pNumber).match(matcher("grid-column-start")),
    ],
  ]],
  ["end", [
    ["auto", { "grid-column-end": "auto" }],
    [
      re$PositiveNumber,
      ([, pNumber]) => parseNumeric(pNumber).match(matcher("grid-column-end")),
    ],
  ]],
];
