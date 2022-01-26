import { AUTO, AVOID } from "../../constants.ts";
import type { Rule } from "../../core/types.ts";

const BREAK_INSIDE = "break-inside";

export const breakInsides: Rule[] = [
  ["break-inside-auto", {
    [BREAK_INSIDE]: AUTO,
  }],
  ["break-inside-avoid", {
    [BREAK_INSIDE]: AVOID,
  }],
  ["break-inside-avoid-page", {
    [BREAK_INSIDE]: `${AVOID}-page`,
  }],
  ["break-inside-avoid-column", {
    [BREAK_INSIDE]: `${AVOID}-column`,
  }],
];

const BOX_DECORATION_BREAK = "box-decoration-break";
export const boxDecorations: Rule[] = [
  ["box-decoration-clone", {
    [BOX_DECORATION_BREAK]: "clone",
  }],
  ["box-decoration-slice", {
    [BOX_DECORATION_BREAK]: "slice",
  }],
];
