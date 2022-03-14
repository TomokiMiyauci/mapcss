import { execMatch, reBracket_$ } from "../../core/utils/regexp.ts";
import type { CSSMap } from "../../core/types.ts";

export const flex: CSSMap = {
  "": { display: "flex" },
  1: { flex: "1 1 0%" },
  auto: { flex: "1 1 auto" },
  initial: { flex: "0 1 auto" },
  none: { flex: "none" },
  row: {
    "": { flexDirection: "row" },
    reverse: { flexDirection: "row-reverse" },
  },
  col: {
    "": { flexDirection: "column" },
    reverse: { flexDirection: "column-reverse" },
  },
  wrap: {
    "": { flexWrap: "wrap" },
    reverse: { flexWrap: "wrap-reverse" },
  },
  nowrap: { flexWrap: "nowrap" },
  "*": (match) =>
    execMatch(match, [
      [reBracket_$, ([, arbitrary]) => ({ flex: arbitrary })],
    ]),
};
