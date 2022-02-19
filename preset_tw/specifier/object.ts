import { reBracket_$ } from "../../core/utils/regexp.ts";
import type { EntriesSpecifier } from "../../core/types.ts";

export const object: EntriesSpecifier = [
  ["contain", { "object-fit": "contain" }],
  ["cover", { "object-fit": "cover" }],
  ["fill", { "object-fit": "fill" }],
  ["none", { "object-fit": "none" }],
  ["scale", {
    down: { "object-fit": "scale-down" },
  }],
  ["top", { "object-position": "top" }],
  ["bottom", { "object-position": "bottom" }],
  ["center", { "object-position": "center" }],
  ["left", {
    DEFAULT: { "object-position": "left" },
    bottom: { "object-position": "left bottom" },
    top: { "object-position": "left top" },
  }],
  ["right", {
    DEFAULT: { "object-position": "right" },
    bottom: { "object-position": "right bottom" },
    top: { "object-position": "right top" },
  }],
  [reBracket_$, ([, arbitrary]) => ({ "object-position": arbitrary })],
];
