import { customPropertySet, matcher, pxify } from "./_utils.ts";
import { re$Numeric } from "../../core/utils/regexp.ts";
import { resolveTheme } from "../../core/resolve.ts";
import { isUndefined } from "../../deps.ts";
import {
  re$All,
  re$AllPer$PositiveNumber,
  re$AllPerBracket_$,
} from "../../core/utils/regexp.ts";
import { parseColor, parseNumeric } from "../../core/utils/monad.ts";
import {
  completionRGBA,
  customProperty,
  ratio,
  rgbFn,
} from "../../core/utils/format.ts";
import type { BlockDefinition, EntriesIdentifier } from "../../core/types.ts";

function toRingColor(varPrefix: string) {
  return (value: string): BlockDefinition => ({
    [customProperty("ring-color", varPrefix)]: value,
  });
}
function toRingOffsetColor(varPrefix: string) {
  return (value: string): BlockDefinition => ({
    [customProperty("ring-offset-color", varPrefix)]: value,
  });
}

function handleRingWidth(
  value: string,
  variablePrefix: string,
): BlockDefinition {
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

export const ring: EntriesIdentifier = [
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
    [re$Numeric, ([, numeric], { variablePrefix }) => {
      const [varRingOffsetWidth] = customPropertySet(
        "ring-offset-width",
        variablePrefix,
      );
      return parseNumeric(numeric).map(pxify).match(
        matcher(varRingOffsetWidth),
      );
    }],

    [re$AllPer$PositiveNumber, ([, body, numeric], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;

      return parseNumeric(numeric).match({
        some: (number) =>
          parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn).match(
            {
              some: toRingOffsetColor(context.variablePrefix),
              none: undefined,
            },
          ),
        none: undefined,
      });
    }],
    [re$AllPerBracket_$, ([, body, alpha], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;
      return parseColor(color).map(({ r, g, b }) => ({ r, g, b, a: alpha }))
        .map(
          rgbFn,
        ).match({
          some: toRingOffsetColor(context.variablePrefix),
          none: undefined,
        });
    }],
    [
      re$All,
      ([body], context) => {
        const color = resolveTheme(body, "color", context);
        if (isUndefined(color)) return;

        return parseColor(color).map(completionRGBA(1, true))
          .map(rgbFn)
          .match({
            some: toRingOffsetColor(context.variablePrefix),
            none: () => toRingOffsetColor(context.variablePrefix)(color),
          });
      },
    ],
  ]],
  [
    re$Numeric,
    ([, numeric], { variablePrefix }) =>
      parseNumeric(numeric).map(pxify).match({
        some: (px) => handleRingWidth(px, variablePrefix),
        none: undefined,
      }),
  ],
  [re$AllPer$PositiveNumber, ([, body, numeric], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return parseNumeric(numeric).match({
      some: (number) =>
        parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn).match({
          some: toRingColor(context.variablePrefix),
          none: undefined,
        }),
      none: undefined,
    });
  }],
  [re$AllPerBracket_$, ([, body, alpha], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;
    return parseColor(color).map(({ r, g, b }) => ({ r, g, b, a: alpha })).map(
      rgbFn,
    ).match({
      some: toRingColor(context.variablePrefix),
      none: undefined,
    });
  }],
  [
    re$All,
    ([body], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;

      return parseColor(color).map(completionRGBA(1, true))
        .map(rgbFn)
        .match({
          some: toRingColor(context.variablePrefix),
          none: () => toRingColor(context.variablePrefix)(color),
        });
    },
  ],
];