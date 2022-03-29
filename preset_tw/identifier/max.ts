// This module is browser compatible.

import { execMatch, re$Numeric, reBracket_$ } from "../../core/utils/regexp.ts";
import { matcher, remify } from "./_utils.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import type { CSSMap } from "../../core/types.ts";

export const max: CSSMap = {
  w: {
    0: { maxWidth: "0rem" },
    none: { maxWidth: "none" },
    xs: { maxWidth: "20rem" },
    sm: { maxWidth: "24rem" },
    md: { maxWidth: "28rem" },
    lg: { maxWidth: "32rem" },
    xl: { maxWidth: "36rem" },
    "2xl": { maxWidth: "42rem" },
    "3xl": { maxWidth: "48rem" },
    "4xl": { maxWidth: "56rem" },
    "5xl": { maxWidth: "64rem" },
    "6xl": { maxWidth: "72rem" },
    "7xl": { maxWidth: "80rem" },
    full: { maxWidth: "100%" },
    min: { maxWidth: "min-content" },
    max: { maxWidth: "max-content" },
    fit: { maxWidth: "fit-content" },
    prose: { maxWidth: "65ch" },
    screen: {
      sm: { maxWidth: "640px" },
      md: { maxWidth: "768px" },
      lg: { maxWidth: "1024px" },
      xl: { maxWidth: "1280px" },
      "2xl": { maxWidth: "1536px" },
    },
    "*": ({ id }) =>
      execMatch(id, [
        [reBracket_$, ([, arbitrary]) => ({ maxWidth: arbitrary })],
      ]),
  },
  h: {
    0: { maxHeight: "0px" },
    px: { maxHeight: "1px" },
    full: { maxHeight: "100%" },
    screen: { maxHeight: "100vh" },
    min: { maxHeight: "min-content" },
    max: { maxHeight: "max-content" },
    fit: { maxHeight: "fit-content" },
    "*": ({ id }) =>
      execMatch(id, [
        [
          re$Numeric,
          ([, numeric]) =>
            parseNumeric(numeric).andThen(remify).match(matcher("max-height")),
        ],
        [reBracket_$, ([, arbitrary]) => ({ maxHeight: arbitrary })],
      ]),
  },
};
