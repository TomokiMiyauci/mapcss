import {
  type Arrayable,
  associateWith,
  isNumber,
  isString,
  isUndefined,
  type Option,
} from "../../deps.ts";
import {
  customProperty,
  multiple,
  roundN,
  shortDecimal,
  unit,
} from "../../core/utils/format.ts";
import { hex2RGBA, parseNumeric, RGBA } from "../../core/utils/parse.ts";
import {
  stringifyCustomProperty,
  stringifyRGBA,
  stringifyVarFunction,
} from "../../core/utils/stringify.ts";
import { per } from "../../core/utils/monad.ts";
import type { CSSStatement, Declaration } from "../../core/types.ts";

export function fillRGBA(
  { a, ...rest }: RGBA,
  alpha?: number,
): Record<keyof RGBA, number> {
  return {
    ...rest,
    a: isNumber(alpha) ? alpha : isNumber(a) ? a / 100 : 1,
  };
}

export function associateRGBA(
  color: string,
  array: string[],
  alpha?: string,
): Declaration | CSSStatement | undefined {
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

export function percentize(value: number): string {
  return unit("%")(roundN(6)(multiple(100)(value)));
}

export function remify(value: number): Option<string> {
  return per(4)(value).map(roundN(6)).map(unit("rem"));
}

export function pxify(value: number): string {
  return unit("px")(shortDecimal(value));
}

export function matcher(maybeArray: Arrayable<string>) {
  return {
    some: (value: string | number) =>
      associateWith(
        Array.isArray(maybeArray) ? maybeArray : [maybeArray],
        () => value,
      ),
    none: undefined,
  };
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
): Declaration {
  return {
    ...associateWith(
      properties.map((property) => customProperty(property, varPrefix)),
      () => value,
    ),
    transform: transformValue(varPrefix),
  };
}
