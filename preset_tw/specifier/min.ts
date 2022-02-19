import { reBracket_$ } from "../../core/utils/regexp.ts";
import type { RecordSpecifier } from "../../core/types.ts";

export const min: RecordSpecifier = {
  w: [
    [0, { "min-width": "0px" }],
    ["full", { "min-width": "100%" }],
    ["min", { "min-width": "min-content" }],
    ["max", { "min-width": "max-content" }],
    ["fit", { "min-width": "fit-content" }],
    [reBracket_$, ([, arbitrary]) => ({ "min-width": arbitrary })],
  ],
  h: [
    [0, { "min-height": "0px" }],
    ["full", { "min-height": "100%" }],
    ["screen", { "min-height": "100vh" }],
    ["min", { "min-height": "min-content" }],
    ["max", { "min-height": "max-content" }],
    ["fit", { "min-height": "fit-content" }],
    [reBracket_$, ([, arbitrary]) => ({ "min-height": arbitrary })],
  ],
};
