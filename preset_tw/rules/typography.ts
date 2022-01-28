import { isNumber, isString } from "../../deps.ts";
import { resolveTheme } from "../../core/utils/resolver.ts";
import { SEPARATOR } from "../_utils.ts";
import { hex2RGBA, parseNumeric } from "../../core/utils/parse.ts";
import { stringifyRGBA, stringifyVar } from "../../core/utils/color.ts";
import { constructVar } from "../../core/_utils.ts";
import type { PresetTwTheme } from "../theme/types.ts";
import type { Rule } from "../../core/types.ts";

const variablePrefix = "map-";

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
  [/^text-(.+)\/(\d+)$/, ([, body, op], { theme }) => {
    const colors = body.split(SEPARATOR);

    const color = resolveTheme(theme as PresetTwTheme, {
      scope: "color",
      path: colors,
    }) as unknown;
    if (!isString(color)) return;

    const maybeRGBA = hex2RGBA(color);
    const opacity = parseNumeric(op);

    if (!maybeRGBA || !isNumber(opacity)) return;

    const { r, g, b } = maybeRGBA;

    return {
      color: stringifyRGBA({ r, g, b, a: opacity / 100 }),
    };
  }],
  [/^text-(.+)$/, ([, body], { theme }) => {
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
    const { r, g, b, a } = maybeRGBA;
    const opacity = constructVar("text-opacity", variablePrefix);

    if (isNumber(a)) {
      return {
        color: stringifyRGBA({ r, g, b, a: a / 100 }),
      };
    }

    return {
      [opacity]: 1,
      color: stringifyRGBA({ r, g, b, a: stringifyVar(opacity) }),
    };
  }],
];
