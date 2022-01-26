import { isUndefined, prop } from "../../deps.ts";
import type { Rule } from "../../core/types.ts";

export const lineHeights: Rule[] = [
  [/leading-(.+)/, ([, body], { theme }) => {
    const lineHeight = prop(body, theme.lineHeight);
    if (isUndefined(lineHeight)) return;

    return {
      "line-height": lineHeight,
    };
  }],
];
