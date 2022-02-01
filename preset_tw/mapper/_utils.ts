import { associateWith, isNumber, isString, isUndefined } from "../../deps.ts";
import { resolveTheme } from "../../core/utils/resolver.ts";
import { percent, px, rem } from "../../core/utils/unit.ts";
import { SEPARATOR } from "../_utils.ts";
import {
  hex2RGBA,
  parseFraction,
  parseNumeric,
  RGBA,
} from "../../core/utils/parse.ts";
import { stringifyRGBA, stringifyVar } from "../../core/utils/color.ts";
import { constructVar } from "../../core/_utils.ts";
import type { CSSObject, Theme } from "../../core/types.ts";

const variablePrefix = "map-";

export function colorByProp(
  property: string,
  { theme, prop }: { theme: Theme; prop: string },
) {
  const colors = prop.split(SEPARATOR);

  const color = resolveTheme(theme, {
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

export function fillRGBA(
  { a, ...rest }: RGBA,
  alpha?: number,
): Record<keyof RGBA, number> {
  return {
    ...rest,
    a: isNumber(alpha) ? alpha : isNumber(a) ? a / 100 : 1,
  };
}

export function colorByRGBA(
  value: string,
  onValid: (rgba: RGBA) => CSSObject | undefined,
  onError?: (value: string) => CSSObject,
): CSSObject | undefined {
  const maybeRGBA = hex2RGBA(value);
  if (isUndefined(maybeRGBA)) {
    return onError?.(value);
  }
  return onValid(maybeRGBA);
}
export function colorOpacityByProp(
  property: string,
  { theme, prop, opacity }: { theme: Theme; prop: string; opacity: string },
) {
  const colors = prop.split(SEPARATOR);

  const color = resolveTheme(theme, {
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

export function remBy(
  value: string,
  onValid: (rem: string) => CSSObject,
): CSSObject | undefined {
  const number = parseNumeric(value);
  if (isUndefined(number)) return;

  return onValid(rem(number / 4));
}

export function fractionBy(
  numerator: string,
  denominator: string,
  onValid: (percent: string) => CSSObject,
): CSSObject | undefined {
  const fraction = parseFraction(numerator, denominator);
  if (isUndefined(fraction)) return;

  return onValid(percent(fraction * 100));
}

export function pxBy(
  value: string,
  onValid: (rem: string) => CSSObject,
): CSSObject | undefined {
  const number = parseNumeric(value);
  if (isUndefined(number)) return;

  return onValid(px(number));
}

export function numericBy(
  value: string,
  onValid: (number: number) => CSSObject | undefined,
): CSSObject | undefined {
  const number = parseNumeric(value);
  if (isUndefined(number)) return;
  return onValid(number);
}

export function associateRGBA(
  color: string,
  array: string[],
  alpha?: string,
): CSSObject | undefined {
  return colorByRGBA(color, (rgba) => {
    let a: number | undefined;
    if (isString(alpha)) {
      const _alpha = parseNumeric(alpha);
      if (isUndefined(_alpha)) return;
      a = _alpha / 100;
    }

    const value = stringifyRGBA(fillRGBA(rgba, a));

    return associateWith(array, () => value);
  }, (raw) => associateWith(array, () => raw));
}

export function associatePx(
  value: string,
  array: string[],
): CSSObject | undefined {
  return pxBy(
    value,
    (px) => associateWith(array, () => px),
  );
}
