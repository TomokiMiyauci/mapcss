import { execMatch, re$Numeric, reBracket_$ } from "../../core/utils/regexp.ts";
import { matcher, remify } from "./_utils.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import type { CSSMap } from "../../core/types.ts";

export const gap: CSSMap = {
  0: { gap: "0px" },
  px: { gap: "1px" },
  x: {
    0: { columnGap: "0px" },
    px: { columnGap: "1px" },
    "*": (match) =>
      execMatch(match, [
        [
          re$Numeric,
          ([, numeric]) =>
            parseNumeric(numeric).andThen(remify).match(matcher("column-gap")),
        ],
        [reBracket_$, ([, arbitrary]) => ({ columnGap: arbitrary })],
      ]),
  },
  y: {
    0: { rowGap: "0px" },
    px: { rowGap: "1px" },
    "*": (match) =>
      execMatch(match, [
        [
          re$Numeric,
          ([, numeric]) =>
            parseNumeric(numeric).andThen(remify).match(matcher("row-gap")),
        ],
        [reBracket_$, ([, arbitrary]) => ({ rowGap: arbitrary })],
      ]),
  },
  "*": (match) =>
    execMatch(match, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("gap")),
      ],
      [reBracket_$, ([, gap]) => ({ gap })],
    ]),
};
