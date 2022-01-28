import { isNumber, isString } from "../../deps.ts";
import { resolveTheme } from "../../core/utils/resolver.ts";
import { colorByProp, colorOpacityByProp } from "./_utils.ts";
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

export const colors: Rule[] = [
  [/^text-(.+)\/(\d+)$/, ([, prop, opacity], { theme }) => {
    return colorOpacityByProp("color", { theme, prop, opacity });
  }],
  [/^text-(.+)$/, ([, prop], { theme }) => {
    return colorByProp("color", { theme, prop });
  }],
];
