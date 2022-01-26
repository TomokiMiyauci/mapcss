import { isString, prop } from "../../deps.ts";
import type { Rule } from "../../core/types.ts";

export const maxWidths: Rule[] = [
  [/^max-w-(.+)$/, ([, body], { theme }) => {
    const maxWidth = prop(body, theme.maxWidth);

    if (isString(maxWidth)) {
      return {
        "max-width": maxWidth,
      };
    }
  }],
];
