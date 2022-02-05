import { rePositiveNumber } from "../../core/utils/regexp.ts";
import { numericBy } from "./_utils.ts";
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
    [rePositiveNumber, ([, pNumber]) =>
      numericBy(
        pNumber,
        (number) => ({
          "grid-template-columns": `repeat(${number}, minmax(0, 1fr))`,
        }),
      )],
  ]],
  ["rows", [
    ["none", { "grid-template-rows": "none" }],
    [rePositiveNumber, ([, pNumber]) =>
      numericBy(
        pNumber,
        (number) => ({
          "grid-template-rows": `repeat(${number}, minmax(0, 1fr))`,
        }),
      )],
  ]],
];
