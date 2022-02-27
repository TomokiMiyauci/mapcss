import { re$PositiveNumber, reBracket_$ } from "../../core/utils/regexp.ts";
import { matcher } from "./_utils.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import type { EntriesIdentifier } from "../../core/types.ts";

export const row: EntriesIdentifier = [
  ["auto", { "grid-row": "auto" }],
  ["span", [
    ["full", { "grid-row": "1/-1" }],
    [
      re$PositiveNumber,
      ([, pNumber]) =>
        parseNumeric(pNumber).map((number) => `span ${number}/span ${number}`)
          .match(matcher("grid-row")),
    ],
  ]],
  ["start", [
    ["auto", { "grid-row-start": "auto" }],
    [
      re$PositiveNumber,
      ([, pNumber]) => parseNumeric(pNumber).match(matcher("grid-row-start")),
    ],
    [reBracket_$, ([, arbitrary]) => ({ "grid-row-start": arbitrary })],
  ]],
  ["end", [
    ["auto", { "grid-row-end": "auto" }],
    [
      re$PositiveNumber,
      ([, pNumber]) => parseNumeric(pNumber).match(matcher("grid-row-end")),
    ],
    [reBracket_$, ([, arbitrary]) => ({ "grid-row-end": arbitrary })],
  ]],
  [reBracket_$, ([, arbitrary]) => ({ "grid-row": arbitrary })],
];
