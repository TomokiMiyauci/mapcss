import { re$PositiveNumber, reBracket_$ } from "../../core/utils/regexp.ts";
import { matcher } from "./_utils.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import type { Identifier } from "../../core/types.ts";

export const grid: Identifier = [
  ["DEFAULT", { display: "grid" }],
  ["flow", {
    row: {
      DEFAULT: { "grid-auto-flow": "row" },
      dense: { "grid-auto-flow": "row dense" },
    },
    col: {
      DEFAULT: { "grid-auto-flow": "column" },
      dense: { "grid-auto-flow": "column dense" },
    },
  }],
  ["cols", [
    ["none", { "grid-template-columns": "none" }],
    [
      re$PositiveNumber,
      ([, pNumber]) =>
        parseNumeric(pNumber).map((number) =>
          `repeat(${number}, minmax(0, 1fr))`
        ).match(matcher("grid-template-columns")),
    ],
    [reBracket_$, ([, arbitrary]) => ({ "grid-template-columns": arbitrary })],
  ]],
  ["rows", [
    ["none", { "grid-template-rows": "none" }],
    [
      re$PositiveNumber,
      ([, pNumber]) =>
        parseNumeric(pNumber).map((number) =>
          `repeat(${number}, minmax(0, 1fr))`
        ).match(matcher("grid-template-rows")),
    ],
    [reBracket_$, ([, arbitrary]) => ({ "grid-template-rows": arbitrary })],
  ]],
];
