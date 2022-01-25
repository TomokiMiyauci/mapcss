import { isNumber, prop } from "../../deps.ts";
import type { Rule } from "../../core/types.ts";

export const fontWeights: Rule[] = [
  [/font-(.+)/, ([, body], { theme }) => {
    const fontWeight = prop(body, theme.fontWeight);

    if (isNumber(fontWeight)) {
      return {
        "font-weight": fontWeight,
      };
    }
  }],
];
