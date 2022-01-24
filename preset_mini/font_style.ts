import type { Rule } from "../core/types.ts";

const FONT_STYLE = "font-style";
export const fontStyles: Rule[] = [
  ["italic", { [FONT_STYLE]: "italic" }],
  ["not-italic", { [FONT_STYLE]: "normal" }],
];
