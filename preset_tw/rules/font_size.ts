import { resolveTheme } from "../../core/utils/resolver.ts";
import type { PresetTwTheme } from "../theme/types.ts";
import type { Rule } from "../../core/types.ts";

export const fontSizes: Rule[] = [
  [/^text-(.+)$/, ([, path], { theme }) => {
    const fontSizes = resolveTheme(theme as PresetTwTheme, {
      scope: "fontSize",
      path,
    });

    if (fontSizes) {
      return {
        "font-size": fontSizes[0],
        "line-height": fontSizes[1],
      };
    }
  }],
];
