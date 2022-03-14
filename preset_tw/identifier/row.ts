import {
  execMatch,
  re$PositiveNumber,
  reBracket_$,
} from "../../core/utils/regexp.ts";
import { matcher } from "./_utils.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import type { CSSMap } from "../../core/types.ts";

export const row: CSSMap = {
  auto: { gridRow: "auto" },
  span: {
    full: { gridRow: "1/-1" },
    "*": (match) =>
      execMatch(match, [
        [
          re$PositiveNumber,
          ([, pNumber]) =>
            parseNumeric(pNumber).map((number) =>
              `span ${number}/span ${number}`
            )
              .match(matcher("grid-row")),
        ],
      ]),
  },
  start: {
    auto: { gridRowStart: "auto" },
    "*": (match) =>
      execMatch(match, [
        [
          re$PositiveNumber,
          ([, pNumber]) =>
            parseNumeric(pNumber).match(matcher("grid-row-start")),
        ],
        [reBracket_$, ([, arbitrary]) => ({ gridRowStart: arbitrary })],
      ]),
  },
  end: {
    auto: { gridRowEnd: "auto" },
    "*": (match) =>
      execMatch(match, [
        [
          re$PositiveNumber,
          ([, pNumber]) => parseNumeric(pNumber).match(matcher("grid-row-end")),
        ],
        [reBracket_$, ([, arbitrary]) => ({ gridRowEnd: arbitrary })],
      ]),
  },
  "*": (match) =>
    execMatch(match, [
      [reBracket_$, ([, arbitrary]) => ({ gridRow: arbitrary })],
    ]),
};
