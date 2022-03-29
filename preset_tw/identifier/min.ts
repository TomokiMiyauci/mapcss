// This module is browser compatible.

import { execMatch, reBracket_$ } from "../../core/utils/regexp.ts";
import type { CSSMap } from "../../core/types.ts";

export const min: CSSMap = {
  w: {
    0: { minWidth: "0px" },
    full: { minWidth: "100%" },
    min: { minWidth: "min-content" },
    max: { minWidth: "max-content" },
    fit: { minWidth: "fit-content" },
    "*": ({ id }) =>
      execMatch(id, [
        [reBracket_$, ([, arbitrary]) => ({ minWidth: arbitrary })],
      ]),
  },
  h: {
    0: { minHeight: "0px" },
    full: { minHeight: "100%" },
    screen: { minHeight: "100vh" },
    min: { minHeight: "min-content" },
    max: { minHeight: "max-content" },
    fit: { minHeight: "fit-content" },
    "*": ({ id }) =>
      execMatch(id, [
        [reBracket_$, ([, arbitrary]) => ({ minHeight: arbitrary })],
      ]),
  },
};
