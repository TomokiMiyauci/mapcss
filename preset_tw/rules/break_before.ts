import { AUTO, LEFT, RIGHT } from "../../constants.ts";
import type { Rule } from "../../core/types.ts";

const [BREAK_BEFORE] = "break-before";

export const breakBefore: Rule[] = [
  ["break-before-auto", { [BREAK_BEFORE]: AUTO }],
  ["break-before-avoid", { [BREAK_BEFORE]: "avoid" }],
  ["break-before-all", { [BREAK_BEFORE]: "all" }],
  ["break-before-avoid-page", { [BREAK_BEFORE]: "avoid-page" }],
  ["break-before-page", { [BREAK_BEFORE]: "page" }],
  ["break-before-left", { [BREAK_BEFORE]: LEFT }],
  ["break-before-right", { [BREAK_BEFORE]: RIGHT }],
  ["break-before-column", { [BREAK_BEFORE]: "column" }],
];
