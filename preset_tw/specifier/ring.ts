import { customPropertySet, pxBy } from "./_utils.ts";
import { reNumeric } from "../../core/utils/regexp.ts";
import type { CSSObject, EntriesSpecifier } from "../../core/types.ts";

function handleRingWidth(value: string, variablePrefix: string): CSSObject {
  const [varRingOffsetShadow, varFnRingOffsetShadow] = customPropertySet(
    "ring-offset-shadow",
    variablePrefix,
  );
  const [varRingShadow, varFnRingShadow] = customPropertySet(
    "ring-shadow",
    variablePrefix,
  );
  const [, varFnRingInset] = customPropertySet(
    "ring-inset",
    variablePrefix,
  );
  const [, varFnRingOffsetWidth] = customPropertySet(
    "ring-offset-width",
    variablePrefix,
  );
  const [, varFnRingOffsetColor] = customPropertySet(
    "ring-offset-color",
    variablePrefix,
  );
  const [, varFnRingColor] = customPropertySet(
    "ring-color",
    variablePrefix,
  );
  const [varShadow] = customPropertySet("shadow", variablePrefix);
  return {
    [varRingOffsetShadow]:
      `${varFnRingInset} 0 0 0 ${varFnRingOffsetWidth} ${varFnRingOffsetColor}`,
    [varRingShadow]:
      `${varFnRingInset} 0 0 0 calc(${value} + ${varFnRingOffsetWidth}) ${varFnRingColor}`,
    "box-shadow":
      `${varFnRingOffsetShadow}, ${varFnRingShadow}, var(${varShadow}, 0 0 #0000)`,
  };
}

export const ring: EntriesSpecifier = [
  [
    "DEFAULT",
    (_, { variablePrefix }) => handleRingWidth("3px", variablePrefix),
  ],
  ["inset", (_, { variablePrefix }) => {
    const [varRingInset] = customPropertySet("ring-inset", variablePrefix);
    return {
      [varRingInset]: "inset",
    };
  }],
  ["offset", [
    [reNumeric, ([, numeric], { variablePrefix }) =>
      pxBy(numeric, (px) => {
        const [varRingOffsetWidth] = customPropertySet(
          "ring-offset-width",
          variablePrefix,
        );
        return {
          [varRingOffsetWidth]: px,
        };
      })],
  ]],
  [
    reNumeric,
    ([, numeric], { variablePrefix }) =>
      pxBy(numeric, (px) => handleRingWidth(px, variablePrefix)),
  ],
];
