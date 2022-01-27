import { isNumber, isString } from "../../deps.ts";
import { resolveTheme } from "../../core/utils/resolver.ts";
import type { PresetTwTheme } from "../theme/types.ts";
import type { Rule } from "../../core/types.ts";

export const lineHeights: Rule[] = [
  [/^leading-(.+)$/, ([, path], { theme }) => {
    const lineHeight = resolveTheme(theme as PresetTwTheme, {
      path,
      scope: "lineHeight",
    });
    if (isString(lineHeight) || isNumber(lineHeight)) {
      return {
        "line-height": lineHeight,
      };
    }
  }],
];
