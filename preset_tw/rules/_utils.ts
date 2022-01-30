import { isNumber, isString, isUndefined } from "../../deps.ts";
import { resolveTheme } from "../../core/utils/resolver.ts";
import { rem } from "../../core/utils/unit.ts";
import { SEPARATOR } from "../_utils.ts";
import { hex2RGBA, parseNumeric } from "../../core/utils/parse.ts";
import { stringifyRGBA, stringifyVar } from "../../core/utils/color.ts";
import { constructVar } from "../../core/_utils.ts";
import type { PresetTwTheme } from "../theme/types.ts";
import type { Theme } from "../../core/types.ts";

const variablePrefix = "map-";

export function colorByProp(
  property: string,
  { theme, prop }: { theme: Theme; prop: string },
) {
  const colors = prop.split(SEPARATOR);

  const color = resolveTheme(theme as PresetTwTheme, {
    scope: "color",
    path: colors,
  }) as unknown;
  if (!isString(color)) return;

  const maybeRGBA = hex2RGBA(color);
  if (!maybeRGBA) {
    return {
      [property]: color,
    };
  }
  const { r, g, b, a } = maybeRGBA;
  const opacity = constructVar("text-opacity", variablePrefix);

  if (isNumber(a)) {
    return {
      [property]: stringifyRGBA({ r, g, b, a: a / 100 }),
    };
  }

  return {
    [opacity]: 1,
    [property]: stringifyRGBA({ r, g, b, a: stringifyVar(opacity) }),
  };
}

export function colorOpacityByProp(
  property: string,
  { theme, prop, opacity }: { theme: Theme; prop: string; opacity: string },
) {
  const colors = prop.split(SEPARATOR);

  const color = resolveTheme(theme as PresetTwTheme, {
    scope: "color",
    path: colors,
  }) as unknown;
  if (!isString(color)) return;

  const maybeRGBA = hex2RGBA(color);
  const _opacity = parseNumeric(opacity);

  if (!maybeRGBA || !isNumber(_opacity)) return;

  const { r, g, b } = maybeRGBA;

  return {
    [property]: stringifyRGBA({ r, g, b, a: _opacity / 100 }),
  };
}

export function remByProp(property: string, value: string): {
  [x: string]: string;
} | undefined {
  const number = parseNumeric(value);
  if (isUndefined(number)) return;
  return {
    [property]: rem(number / 4),
  };
}
