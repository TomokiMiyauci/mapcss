// This module is browser compatible.

import { customPropertySet, pxify } from "./_utils.ts";
import { resolveTheme } from "../../core/resolve.ts";
import { isUndefined } from "../deps.ts";
import {
  execMatch,
  re$All,
  re$AllPer$PositiveNumber,
  re$AllPerBracket_$,
  re$PositiveNumber,
} from "../../core/utils/regexp.ts";
import { parseColor, parseNumeric } from "../../core/utils/monad.ts";
import {
  completionRGBA,
  ratio,
  rgbFn,
  stringifyCustomProperty,
} from "../../core/utils/format.ts";
import type { CSS, CSSDefinition, CSSMap } from "../../core/types.ts";

const combinator = ">:not([hidden])~:not([hidden])";

function constructRule(
  decl: CSS,
  className: string,
): CSSDefinition {
  return {
    type: "css",
    value: {
      [combine(className)]: decl,
    },
  };
}

function combine(selector: string): string {
  return `${selector}${combinator}`;
}

export const divide: CSSMap = {
  solid: (_, { className }) =>
    constructRule({ borderStyle: "solid" }, className),
  dashed: (_, { className }) =>
    constructRule({ borderStyle: "dashed" }, className),
  dotted: (_, { className }) =>
    constructRule({ borderStyle: "dotted" }, className),
  double: (_, { className }) =>
    constructRule({ borderStyle: "double" }, className),
  none: (_, { className }) => constructRule({ borderStyle: "none" }, className),
  x: {
    "": (_, { variablePrefix, className }) => {
      const [variable, varFn] = customPropertySet(
        "divide-x-reverse",
        variablePrefix,
      );

      return constructRule({
        [variable]: 0,
        borderRightWidth: `calc(1px * ${varFn})`,
        borderLeftWidth: `calc(1px * calc(1 - ${varFn}))`,
      }, className);
    },
    reverse: (_, { variablePrefix, className }) =>
      constructRule({
        [stringifyCustomProperty("divide-x-reverse", variablePrefix)]: 1,
      }, className),
    "*": ({ id }, { variablePrefix, className }) =>
      execMatch(id, [
        [
          re$PositiveNumber,
          ([, pNumber]) =>
            parseNumeric(pNumber).map(pxify).map((px) => {
              const [variable, varFn] = customPropertySet(
                "divide-x-reverse",
                variablePrefix,
              );
              return constructRule({
                [variable]: 0,
                borderRightWidth: `calc(${px} * ${varFn})`,
                borderLeftWidth: `calc(${px} * calc(1 - ${varFn}))`,
              }, className);
            }).match({
              some: (v) => v,
              none: undefined,
            }),
        ],
      ]),
  },
  y: {
    "": (_, { variablePrefix, className }) => {
      const [variable, varFn] = customPropertySet(
        "divide-y-reverse",
        variablePrefix,
      );

      return constructRule({
        [variable]: 0,
        borderTopWidth: `calc(1px * calc(1 - ${varFn}))`,
        borderBottomWidth: `calc(1px * ${varFn})`,
      }, className);
    },
    reverse: (_, { variablePrefix, className }) =>
      constructRule({
        [stringifyCustomProperty("divide-y-reverse", variablePrefix)]: 1,
      }, className),
    "*": ({ id }, { variablePrefix, className }) =>
      execMatch(id, [
        [
          re$PositiveNumber,
          ([, pNumber]) =>
            parseNumeric(pNumber).map(pxify).match({
              some: (px) => {
                const [variable, varFn] = customPropertySet(
                  "divide-y-reverse",
                  variablePrefix,
                );
                return constructRule({
                  [variable]: 0,
                  borderTopWidth: `calc(${px} * calc(1 - ${varFn}))`,
                  borderBottomWidth: `calc(${px} * ${varFn})`,
                }, className);
              },
              none: undefined,
            }),
        ],
      ]),
  },
  "*": ({ id }, context) =>
    execMatch(id, [
      [re$AllPer$PositiveNumber, ([, body, numeric]) => {
        const color = resolveTheme(body, "color", context);
        if (isUndefined(color)) return;

        return parseNumeric(numeric).match({
          some: (number) =>
            parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn)
              .match({
                some: (color) =>
                  constructRule({ borderColor: color }, context.className),
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
            some: (color) =>
              constructRule({ borderColor: color }, context.className),
            none: undefined,
          });
      }],
      [
        re$All,
        ([body]) => {
          const color = resolveTheme(body, "color", context);
          if (isUndefined(color)) return;

          const _color = parseColor(color).map(completionRGBA(1, true))
            .map(rgbFn)
            .match({
              some: (color) => color,
              none: color,
            });

          return constructRule({ borderColor: _color }, context.className);
        },
      ],
    ]),
};
