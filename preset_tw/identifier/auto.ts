import { execMatch, reBracket_$ } from "../../core/utils/regexp.ts";
import type { CSSMap } from "../../core/types.ts";

export const auto: CSSMap = {
  cols: {
    auto: { gridAutoColumns: "auto" },
    min: { gridAutoColumns: "min-content" },
    max: { gridAutoColumns: "max-content" },
    fr: { gridAutoColumns: "minmax(0, 1fr)" },
    "*": ({ id }) =>
      execMatch(id, [
        [reBracket_$, ([, arbitrary]) => ({ gridAutoColumns: arbitrary })],
      ]),
  },
  rows: {
    auto: { gridAutoRows: "auto" },
    min: { gridAutoRows: "min-content" },
    max: { gridAutoRows: "max-content" },
    fr: { gridAutoRows: "minmax(0, 1fr)" },
    "*": ({ id }) =>
      execMatch(id, [
        [reBracket_$, ([, arbitrary]) => ({ gridAutoRows: arbitrary })],
      ]),
  },
};
