import type { Rule } from "../../core/types.ts";
import { NONE } from "../../constants.ts";

const TEXT_DECORATION = "text-decoration-line";
export const textDecorations: Rule[] = [
  ["no-underline", { [TEXT_DECORATION]: NONE }],
  ["decoration-none", { [TEXT_DECORATION]: NONE }],
];
