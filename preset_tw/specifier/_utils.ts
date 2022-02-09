import {
  associateWith,
  isNumber,
  isString,
  isUndefined,
  roundTo,
} from "../../deps.ts";
import { percent, px, rem } from "../../core/utils/unit.ts";
import { customProperty } from "../../core/utils/format.ts";
import {
  hex2RGBA,
  parseFraction,
  parseNumeric,
  RGBA,
} from "../../core/utils/parse.ts";
import {
  stringifyCustomProperty,
  stringifyRGBA,
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
  onValid: (rgba: RGBA) => CSSObject | CSSObjectSet | undefined,
  onError?: (value: string) => CSSObject | CSSObjectSet | undefined,
): CSSObject | CSSObjectSet | undefined {
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
  onValid: (rem: string) => CSSObject | CSSObjectSet,
): CSSObject | CSSObjectSet | undefined {
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
  onValid: (number: number) => CSSObject | CSSObjectSet | undefined,
): CSSObject | CSSObjectSet | undefined {
  const number = parseNumeric(value);
  if (isUndefined(number)) return;
  return onValid(number);
}

export function associateRGBA(
  color: string,
  array: string[],
  alpha?: string,
): CSSObject | CSSObjectSet | undefined {
  const maybeColor = colorByStrRGBA(color, alpha);
  if (isUndefined(maybeColor)) return associateWith(array, () => color);

  return associateWith(array, () => maybeColor);
}

export function colorByStrRGBA(
  color: string,
  alpha?: string,
): string | undefined {
  const maybeRGBA = hex2RGBA(color);
  if (isUndefined(maybeRGBA)) return color;

  let a: number | undefined;
  if (isString(alpha)) {
    const _alpha = parseNumeric(alpha);
    if (isUndefined(_alpha)) return;
    a = _alpha / 100;
  }

  return stringifyRGBA(fillRGBA(maybeRGBA, a));
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
): CSSObject | CSSObjectSet | undefined {
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
): CSSObject | CSSObjectSet | undefined {
  return numericBy(
    numeric,
    (number) => associateWith(array, () => number / 100),
  );
}

export function associateNumeric(
  array: string[],
  numeric: string,
): CSSObject | CSSObjectSet | undefined {
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

export function transformValue(varPrefix: string): string {
  const [, varFnTranslateX] = customPropertySet("translate-x", varPrefix);
  const [, varFnTranslateY] = customPropertySet("translate-y", varPrefix);
  const [, varFnRotate] = customPropertySet("rotate", varPrefix);
  const [, varFnSkewX] = customPropertySet("skew-x", varPrefix);
  const [, varFnSkewY] = customPropertySet("skew-y", varPrefix);
  const [, varFnScaleX] = customPropertySet("scale-x", varPrefix);
  const [, varFnScaleY] = customPropertySet("scale-y", varPrefix);
  return `translate(${varFnTranslateX}, ${varFnTranslateY}) rotate(${varFnRotate}) skewX(${varFnSkewX}) skewY(${varFnSkewY}) scaleX(${varFnScaleX}) scaleY(${varFnScaleY})`;
}

export function handleTransform(
  properties: string[],
  value: string,
  varPrefix: string,
): CSSObject {
  return {
    ...associateWith(
      properties.map((property) => customProperty(property, varPrefix)),
      () => value,
    ),
    transform: transformValue(varPrefix),
  };
}
