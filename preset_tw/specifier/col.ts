import { re$PositiveNumber, reBracket_$ } from "../../core/utils/regexp.ts";
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
    [reBracket_$, ([, arbitrary]) => ({ "grid-column-start": arbitrary })],
  ]],
  ["end", [
    ["auto", { "grid-column-end": "auto" }],
    [
      re$PositiveNumber,
      ([, pNumber]) => parseNumeric(pNumber).match(matcher("grid-column-end")),
    ],
    [reBracket_$, ([, arbitrary]) => ({ "grid-column-end": arbitrary })],
  ]],
  [reBracket_$, ([, arbitrary]) => ({ "grid-column": arbitrary })],
];
