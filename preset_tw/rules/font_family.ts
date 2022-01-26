import { isString, prop } from "../../deps.ts";
import type { Rule } from "../../core/types.ts";

export const fontFamilies: Rule[] = [
  [/font-(\w+)/, ([, body], { theme }) => {
    const fontFamily = prop(body, theme.fontFamily);
    if (isString(fontFamily)) {
      return {
        "font-family": fontFamily,
      };
    }
  }],
];
