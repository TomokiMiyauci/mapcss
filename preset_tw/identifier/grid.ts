import {
  execMatch,
  re$PositiveNumber,
  reBracket_$,
} from "../../core/utils/regexp.ts";
import { matcher } from "./_utils.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import type { CSSMap } from "../../core/types.ts";

export const grid: CSSMap = {
  "": { display: "grid" },
  flow: {
    row: {
      "": { gridAutoFlow: "row" },
      dense: { gridAutoFlow: "row dense" },
    },
    col: {
      "": { gridAutoFlow: "column" },
      dense: { gridAutoFlow: "column dense" },
    },
  },
  cols: {
    none: { gridTemplateColumns: "none" },
    "*": ({ id }) =>
      execMatch(id, [
        [
          re$PositiveNumber,
          ([, pNumber]) =>
            parseNumeric(pNumber).map((number) =>
              `repeat(${number}, minmax(0, 1fr))`
            ).match(matcher("grid-template-columns")),
        ],
        [
          reBracket_$,
          ([, arbitrary]) => ({ gridTemplateColumns: arbitrary }),
        ],
      ]),
  },
  rows: {
    none: { gridTemplateRows: "none" },
    "*": ({ id }) =>
      execMatch(id, [
        [
          re$PositiveNumber,
          ([, pNumber]) =>
            parseNumeric(pNumber).map((number) =>
              `repeat(${number}, minmax(0, 1fr))`
            ).match(matcher("grid-template-rows")),
        ],
        [reBracket_$, ([, arbitrary]) => ({ gridTemplateRows: arbitrary })],
      ]),
  },
};
