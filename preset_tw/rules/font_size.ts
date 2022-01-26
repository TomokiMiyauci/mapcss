import { prop } from "../../deps.ts";
import type { Rule } from "../../core/types.ts";

export const fontSizes: Rule[] = [
  [/^text-(.+)$/, ([, body], { theme }) => {
    const fontSizes = prop(body, theme.fontSize);

    if (fontSizes) {
      return {
        "font-size": fontSizes[0],
        "line-height": fontSizes[1],
      };
    }
  }],
];
