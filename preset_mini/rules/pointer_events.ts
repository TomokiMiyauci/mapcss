import { AUTO, NONE } from "../../constants.ts";
import type { Rule } from "../../core/types.ts";

const POINTER_EVENTS = "pointer-events";

export const pointerEvents: Rule[] = [
  ["pointer-events-auto", { [POINTER_EVENTS]: AUTO }],
  ["pointer-events-none", { [POINTER_EVENTS]: NONE }],
];
