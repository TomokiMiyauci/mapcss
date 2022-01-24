import { CENTER, LEFT, RIGHT } from "../constants.ts";
import type { Rule } from "../core/types.ts";

const TEXT_ALIGN = "text-align";
export const textAligns: Rule[] = [
  ["text-center", { [TEXT_ALIGN]: CENTER }],
  ["text-left", { [TEXT_ALIGN]: LEFT }],
  ["text-right", { [TEXT_ALIGN]: RIGHT }],
  ["text-justify", { [TEXT_ALIGN]: "justify" }],
];
