import { isNumber, isString } from "../../deps.ts";
import { resolveTheme } from "../../core/utils/resolver.ts";
import { SEPARATOR } from "../_utils.ts";
import { hex2RGBA } from "../../core/utils/parse.ts";
import { stringifyRGBA } from "../../core/utils/color.ts";
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
  [/^text-(.+)?$/, ([, body], { theme }) => {
    const colors = body.split(SEPARATOR);

    const color = resolveTheme(theme as PresetTwTheme, {
      scope: "color",
      path: colors,
    }) as unknown;
    if (!isString(color)) return;

    const maybeRGBA = hex2RGBA(color);
    if (!maybeRGBA) {
      return {
        color,
      };
    }

    const { r, g, b, a = 1 } = maybeRGBA;

    return {
      color: stringifyRGBA({ r, g, b, a }),
    };
  }],
];
