import {
  execMatch,
  re$PositiveNumber,
  reBracket_$,
} from "../../core/utils/regexp.ts";
import { matcher } from "./_utils.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import type { CSSMap } from "../../core/types.ts";

export const col: CSSMap = {
  auto: { gridColumn: "auto" },
  span: {
    full: { gridColumn: "1/-1" },
    "*": (match) =>
      execMatch(match, [
        [
          re$PositiveNumber,
          ([, pNumber]) =>
            parseNumeric(pNumber).map((number) =>
              `span ${number}/span ${number}`
            )
              .match(matcher("grid-column")),
        ],
      ]),
  },
  start: {
    auto: { gridColumnStart: "auto" },
    "*": (match) =>
      execMatch(match, [
        [
          re$PositiveNumber,
          ([, pNumber]) =>
            parseNumeric(pNumber).match(matcher("grid-column-start")),
        ],
        [reBracket_$, ([, arbitrary]) => ({ gridColumnStart: arbitrary })],
      ]),
  },
  end: {
    auto: { gridColumnEnd: "auto" },
    "*": (match) =>
      execMatch(match, [
        [
          re$PositiveNumber,
          ([, pNumber]) =>
            parseNumeric(pNumber).match(matcher("grid-column-end")),
        ],
        [reBracket_$, ([, arbitrary]) => ({ gridColumnEnd: arbitrary })],
      ]),
  },
  "*": (match) =>
    execMatch(match, [
      [reBracket_$, ([, arbitrary]) => ({ gridColumn: arbitrary })],
    ]),
};
