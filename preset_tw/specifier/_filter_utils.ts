import { customPropertySet } from "./_utils.ts";

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
