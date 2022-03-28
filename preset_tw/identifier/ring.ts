import { customPropertySet, matcher, pxify } from "./_utils.ts";
import { re$Numeric } from "../../core/utils/regexp.ts";
import { resolveTheme } from "../../core/resolve.ts";
import { isUndefined } from "../deps.ts";
import {
  execMatch,
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
import type { CSSMap, DeclBlock } from "../../core/types.ts";

function toRingColor(varPrefix: string) {
  return (value: string): DeclBlock => ({
    [customProperty("ring-color", varPrefix)]: value,
  });
}
function toRingOffsetColor(varPrefix: string) {
  return (value: string): DeclBlock => ({
    [customProperty("ring-offset-color", varPrefix)]: value,
  });
}

function handleRingWidth(
  value: string,
  variablePrefix: string,
): DeclBlock {
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

export const ring: CSSMap = {
  "": (_, { variablePrefix }) => handleRingWidth("3px", variablePrefix),
  inset: (_, { variablePrefix }) => {
    const [varRingInset] = customPropertySet("ring-inset", variablePrefix);
    return {
      [varRingInset]: "inset",
    };
  },
  offset: {
    "*": ({ id }, context) =>
      execMatch(id, [
        [re$Numeric, ([, numeric]) => {
          const [varRingOffsetWidth] = customPropertySet(
            "ring-offset-width",
            context.variablePrefix,
          );
          return parseNumeric(numeric).map(pxify).match(
            matcher(varRingOffsetWidth),
          );
        }],

        [re$AllPer$PositiveNumber, ([, body, numeric]) => {
          const color = resolveTheme(body, "color", context);
          if (isUndefined(color)) return;

          return parseNumeric(numeric).match({
            some: (number) =>
              parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn)
                .match(
                  {
                    some: toRingOffsetColor(context.variablePrefix),
                    none: undefined,
                  },
                ),
            none: undefined,
          });
        }],
        [re$AllPerBracket_$, ([, body, alpha]) => {
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
          ([body]) => {
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
      ]),
  },
  "*": ({ id }, context) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).map(pxify).match({
            some: (px) => handleRingWidth(px, context.variablePrefix),
            none: undefined,
          }),
      ],
      [re$AllPer$PositiveNumber, ([, body, numeric]) => {
        const color = resolveTheme(body, "color", context);
        if (isUndefined(color)) return;

        return parseNumeric(numeric).match({
          some: (number) =>
            parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn)
              .match({
                some: toRingColor(context.variablePrefix),
                none: undefined,
              }),
          none: undefined,
        });
      }],
      [re$AllPerBracket_$, ([, body, alpha]) => {
        const color = resolveTheme(body, "color", context);
        if (isUndefined(color)) return;
        return parseColor(color).map(({ r, g, b }) => ({ r, g, b, a: alpha }))
          .map(
            rgbFn,
          ).match({
            some: toRingColor(context.variablePrefix),
            none: undefined,
          });
      }],
      [
        re$All,
        ([body]) => {
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
    ]),
};
