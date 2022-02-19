import { customPropertySet } from "./_utils.ts";
import { shortDecimal } from "../../core/utils/format.ts";
import { parseNumeric, per } from "../../core/utils/monad.ts";
import type { Declaration, SpecifierCSSStatement } from "../../core/types.ts";
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
): Declaration | SpecifierCSSStatement | undefined {
  return parseNumeric(value).andThen(per(100)).map(shortDecimal).match({
    some: (number) => {
      const [varName] = customPropertySet(propertyName, variablePrefix);
      return {
        [varName]: `${propertyName}(${number})`,
        filter: filterValue(variablePrefix),
      };
    },
    none: undefined,
  });
}
