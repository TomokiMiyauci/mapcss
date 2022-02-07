import { customPropertySet } from "./_utils.ts";
import type { CSSObject, EntriesSpecifier } from "../../core/types.ts";

function handleBlur(value: string, variablePrefix: string): CSSObject {
  const [varBlur, varFnBlur] = customPropertySet("blur", variablePrefix);
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

  return {
    [varBlur]: `blur(${value})`,
    filter:
      `${varFnBlur} ${varFnBrightness} ${varFnContract} ${varFnGrayscale} ${varFnHueRotate} ${varFnInvert} ${varFnSaturate} ${varFnSepia} ${varFnDropShadow}`,
  };
}

export const blur: EntriesSpecifier = [
  ["DEFAULT", (_, { variablePrefix }) => handleBlur("8px", variablePrefix)],
  ["none", (_, { variablePrefix }) => handleBlur("0", variablePrefix)],
  ["sm", (_, { variablePrefix }) => handleBlur("4px", variablePrefix)],
  ["md", (_, { variablePrefix }) => handleBlur("12px", variablePrefix)],
  ["lg", (_, { variablePrefix }) => handleBlur("16px", variablePrefix)],
  ["xl", (_, { variablePrefix }) => handleBlur("24px", variablePrefix)],
  ["2xl", (_, { variablePrefix }) => handleBlur("40px", variablePrefix)],
  ["3xl", (_, { variablePrefix }) => handleBlur("64px", variablePrefix)],
];
