import { NONE } from "../../constants.ts";
import type { Rule } from "../../core/types.ts";

const TEXT_TRANSFORM = "text-transform";
export const textTransforms: Rule[] = [
  ["case-upper", { [TEXT_TRANSFORM]: "uppercase" }],
  ["case-lower", { [TEXT_TRANSFORM]: "lowercase" }],
  ["case-capital", { [TEXT_TRANSFORM]: "capitalize" }],
  ["case-normal", { [TEXT_TRANSFORM]: NONE }],
];
