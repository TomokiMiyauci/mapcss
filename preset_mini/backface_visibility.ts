import { HIDDEN } from "../constants.ts";
import type { Rule } from "../core/types.ts";

const BACKFACE_VISIBILITY = "backface-visibility";
export const backfaceVisibilities: Rule[] = [
  ["backface-visible", { [BACKFACE_VISIBILITY]: "visible" }],
  ["backface-hidden", { [BACKFACE_VISIBILITY]: HIDDEN }],
];
