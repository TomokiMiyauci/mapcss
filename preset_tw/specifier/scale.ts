import { rePositiveNumber } from "../../core/utils/regexp.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import { customPropertySet } from "./_utils.ts";
import {
  customProperty,
  ratio,
  shortDecimal,
} from "../../core/utils/format.ts";
import { associateWith } from "../../deps.ts";
import type { CSSObject, EntriesSpecifier } from "../../core/types.ts";

function transformValue(varPrefix: string): string {
  const [, varFnTranslateX] = customPropertySet("translate-x", varPrefix);
  const [, varFnTranslateY] = customPropertySet("translate-y", varPrefix);
  const [, varFnRotate] = customPropertySet("rotate", varPrefix);
  const [, varFnSkewX] = customPropertySet("skew-x", varPrefix);
  const [, varFnSkewY] = customPropertySet("skew-y", varPrefix);
  const [, varFnScaleX] = customPropertySet("scale-x", varPrefix);
  const [, varFnScaleY] = customPropertySet("scale-y", varPrefix);
  return `translate(${varFnTranslateX}, ${varFnTranslateY}) rotate(${varFnRotate}) skewX(${varFnSkewX}) skewY(${varFnSkewY}) scaleX(${varFnScaleX}) scaleY(${varFnScaleY})`;
}

function handleScale(
  properties: string[],
  value: string,
  varPrefix: string,
): CSSObject | undefined {
  return parseNumeric(value).map(ratio).map(shortDecimal).match({
    some: (v) => ({
      ...associateWith(
        properties.map((property) => customProperty(property, varPrefix)),
        () => v,
      ),
      transform: transformValue(varPrefix),
    }),
    none: undefined,
  });
}

export const scale: EntriesSpecifier = [
  ["x", [
    [
      rePositiveNumber,
      ([, pNumber], { variablePrefix }) =>
        handleScale(["scale-x"], pNumber, variablePrefix),
    ],
  ]],
  ["y", [
    [
      rePositiveNumber,
      ([, pNumber], { variablePrefix }) =>
        handleScale(["scale-y"], pNumber, variablePrefix),
    ],
  ]],
  [
    rePositiveNumber,
    ([, pNumber], { variablePrefix }) =>
      handleScale(["scale-x", "scale-y"], pNumber, variablePrefix),
  ],
];
