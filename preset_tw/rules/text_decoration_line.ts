import type { Rule } from "../../core/types.ts";

const TEXT_DECORATION_LINE = "text-decoration-line";
export const textDecorationLines: Rule[] = [
  ["underline", { [TEXT_DECORATION_LINE]: "underline" }],
  ["overline", { [TEXT_DECORATION_LINE]: "overline" }],
  ["line-through", { [TEXT_DECORATION_LINE]: "line-through" }],
  ["decoration-underline", { [TEXT_DECORATION_LINE]: "underline" }],
  ["decoration-line-through", { [TEXT_DECORATION_LINE]: "line-through" }],
];
