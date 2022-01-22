import { HIDDEN } from "../constants.ts";
import type { Rule } from "../core/types.ts";

export const backfaceVisibility: Rule[] = [
  ["backface-visible", "visible"],
  ["backface-hidden", HIDDEN],
];
