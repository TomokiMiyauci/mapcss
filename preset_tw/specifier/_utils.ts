import {
  associateWith,
  isNumber,
  isString,
  isUndefined,
  roundTo,
} from "../../deps.ts";
import { percent, px, rem } from "../../core/utils/unit.ts";
import {
  hex2RGBA,
  parseFraction,
  parseNumeric,
  RGBA,
} from "../../core/utils/parse.ts";
import { stringifyRGBA } from "../../core/utils/color.ts";
import {
  stringifyCustomProperty,
  stringifyVarFunction,
} from "../../core/utils/stringify.ts";
import type { CSSObject, CSSObjectSet } from "../../core/types.ts";

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

  return onValid(percent(roundTo(fraction * 100, 6)));
}

export function pxBy(
  value: string,
  onValid: (px: string) => CSSObject | CSSObjectSet,
): CSSObject | CSSObjectSet | undefined {
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
): CSSObject | CSSObjectSet | undefined {
  return pxBy(
    value,
    (px) => associateWith(array, () => px),
  );
}

export function associateRem(
  array: string[],
  numeric: string,
): CSSObject | undefined {
  return remBy(numeric, (rem) => associateWith(array, () => rem));
}

export function associatePercent(
  array: string[],
  numerator: string,
  denominator: string,
): CSSObject | undefined {
  return fractionBy(
    numerator,
    denominator,
    (percent) => associateWith(array, () => percent),
  );
}

export function associatePer100(
  array: string[],
  numeric: string,
): CSSObject | undefined {
  return numericBy(
    numeric,
    (number) => associateWith(array, () => number / 100),
  );
}

export function associateNumeric(
  array: string[],
  numeric: string,
): CSSObject | undefined {
  return numericBy(numeric, (number) => associateWith(array, () => number));
}

/** Return [`variable`, `varFunction`] */
export function customPropertySet(
  property: string,
  variablePrefix = "",
): [string, string] {
  const variable = stringifyCustomProperty(
    property,
    variablePrefix,
  );
  const varName = stringifyVarFunction(variable);
  return [variable, varName];
}
