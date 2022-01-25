import { isString, prop } from "../../deps.ts";
import type { Rule } from "../../core/types.ts";

export const letterSpacings: Rule[] = [
  [/^tracking-(.+)$/, ([, body], { theme }) => {
    const letterSpacing = prop(body, theme.letterSpacing);

    if (isString(letterSpacing)) {
      return {
        "letter-spacing": letterSpacing,
      };
    }
  }],
];
