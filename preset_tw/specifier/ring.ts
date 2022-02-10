import { customPropertySet, pxBy } from "./_utils.ts";
import { reNumeric } from "../../core/utils/regexp.ts";
import { resolveTheme } from "../../core/utils/resolver.ts";
import { isUndefined } from "../../deps.ts";
import {
  re$SlashBracket$,
  reAll,
  reSlashNumber,
} from "../../core/utils/regexp.ts";
import { parseColor, parseNumeric } from "../../core/utils/monad.ts";
import {
  completionRGBA,
  customProperty,
  ratio,
  rgbFn,
} from "../../core/utils/format.ts";
import type { CSSObject, EntriesSpecifier } from "../../core/types.ts";

function toRingColor(varPrefix: string) {
  return (value: string): CSSObject => ({
    [customProperty("ring-color", varPrefix)]: value,
  });
}
function toRingOffsetColor(varPrefix: string) {
  return (value: string): CSSObject => ({
    [customProperty("ring-offset-color", varPrefix)]: value,
  });
}

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
    [reSlashNumber, ([, body, numeric], context) => {
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
    [re$SlashBracket$, ([, body, alpha], context) => {
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
      reAll,
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
    reNumeric,
    ([, numeric], { variablePrefix }) =>
      pxBy(numeric, (px) => handleRingWidth(px, variablePrefix)),
  ],
  [reSlashNumber, ([, body, numeric], context) => {
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
  [re$SlashBracket$, ([, body, alpha], context) => {
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
    reAll,
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
