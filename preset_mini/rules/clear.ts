import { BOTH, LEFT, NONE, RIGHT } from "../../constants.ts";
import type { Rule } from "../../core/types.ts";

const CLEAR = "clear";

export const clears: Rule[] = [
  ["clear-left", { [CLEAR]: LEFT }],
  ["clear-right", { [CLEAR]: RIGHT }],
  ["clear-both", { [CLEAR]: BOTH }],
  ["clear-none", { [CLEAR]: NONE }],
];
