import { execMatch, reBracket_$ } from "../../core/utils/regexp.ts";
import type { CSSMap } from "../../core/types.ts";

export const object: CSSMap = {
  contain: { objectFit: "contain" },
  cover: { objectFit: "cover" },
  fill: { objectFit: "fill" },
  none: { objectFit: "none" },
  scale: {
    down: { objectFit: "scale-down" },
  },
  top: { objectPosition: "top" },
  bottom: { objectPosition: "bottom" },
  center: { objectPosition: "center" },
  left: {
    "": { objectPosition: "left" },
    bottom: { objectPosition: "left bottom" },
    top: { objectPosition: "left top" },
  },
  right: {
    "": { objectPosition: "right" },
    bottom: { objectPosition: "right bottom" },
    top: { objectPosition: "right top" },
  },
  "*": (match) =>
    execMatch(match, [
      [reBracket_$, ([, arbitrary]) => ({ objectPosition: arbitrary })],
    ]),
};
