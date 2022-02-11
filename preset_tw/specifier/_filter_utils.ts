import { customPropertySet } from "./_utils.ts";
import { numericBy } from "./_utils.ts";
import { shortDecimal } from "../../core/utils/format.ts";
import type { CSSObject, PartialCSSStatement } from "../../core/types.ts";
export function filterValue(variablePrefix: string): string {
  const [, varFnBlur] = customPropertySet("blur", variablePrefix);
  const [, varFnBrightness] = customPropertySet("brightness", variablePrefix);
  const [, varFnContract] = customPropertySet("contrast", variablePrefix);
  const [, varFnGrayscale] = customPropertySet("grayscale", variablePrefix);
  const [, varFnHueRotate] = customPropertySet("hue-rotate", variablePrefix);
  const [, varFnInvert] = customPropertySet("invert", variablePrefix);
  const [, varFnSaturate] = customPropertySet("saturate", variablePrefix);
  const [, varFnSepia] = customPropertySet("sepia", variablePrefix);
  const [, varFnDropShadow] = customPropertySet(
    "drop-shadow",
    variablePrefix,
  );

  return `${varFnBlur} ${varFnBrightness} ${varFnContract} ${varFnGrayscale} ${varFnHueRotate} ${varFnInvert} ${varFnSaturate} ${varFnSepia} ${varFnDropShadow}`;
}

export function handleFilter(
  propertyName: string,
  value: string,
  variablePrefix: string,
): CSSObject | PartialCSSStatement | undefined {
  return numericBy(value, (number) => {
    const [varName] = customPropertySet(propertyName, variablePrefix);
    return {
      [varName]: `${propertyName}(${shortDecimal(number / 100)})`,
      filter: filterValue(variablePrefix),
    };
  });
}
