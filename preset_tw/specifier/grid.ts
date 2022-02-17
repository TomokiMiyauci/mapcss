import { rePositiveNumber } from "../../core/utils/regexp.ts";
import { matcher } from "./_utils.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import type { Specifier } from "../../core/types.ts";

export const grid: Specifier = [
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
      rePositiveNumber,
      ([, pNumber]) =>
        parseNumeric(pNumber).map((number) =>
          `repeat(${number}, minmax(0, 1fr))`
        ).match(matcher("grid-template-columns")),
    ],
  ]],
  ["rows", [
    ["none", { "grid-template-rows": "none" }],
    [
      rePositiveNumber,
      ([, pNumber]) =>
        parseNumeric(pNumber).map((number) =>
          `repeat(${number}, minmax(0, 1fr))`
        ).match(matcher("grid-template-rows")),
    ],
  ]],
];
