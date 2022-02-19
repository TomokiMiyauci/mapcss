import {
  type Arrayable,
  associateWith,
  isNumber,
  type Option,
} from "../../deps.ts";
import {
  customProperty,
  multiple,
  roundN,
  shortDecimal,
  stringifyCustomProperty,
  stringifyVarFunction,
  unit,
} from "../../core/utils/format.ts";
import { RGBA } from "../../core/utils/parse.ts";
import { per } from "../../core/utils/monad.ts";
import type { Declaration } from "../../core/types.ts";

export function fillRGBA(
  { a, ...rest }: RGBA,
  alpha?: number,
): Record<keyof RGBA, number> {
  return {
    ...rest,
    a: isNumber(alpha) ? alpha : isNumber(a) ? a / 100 : 1,
  };
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
