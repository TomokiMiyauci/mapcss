import { customPropertySet, pxify } from "./_utils.ts";
import { resolveTheme } from "../../core/resolve.ts";
import { isUndefined } from "../../deps.ts";
import {
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
import type {
  BinaryTree,
  CSSDefinition,
  EntriesSpecifier,
} from "../../core/types.ts";

const combinator = ">:not([hidden])~:not([hidden])";

function constructRule(
  decl: BinaryTree<string | number>,
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
export const divide: EntriesSpecifier = [
  ["solid", (_, { className }) =>
    constructRule({
      "border-style": "solid",
    }, className)],
  ["dashed", (_, { className }) =>
    constructRule({
      "border-style": "dashed",
    }, className)],
  ["dotted", (_, { className }) =>
    constructRule({
      "border-style": "dotted",
    }, className)],
  ["double", (_, { className }) =>
    constructRule({
      "border-style": "double",
    }, className)],
  ["none", (_, { className }) =>
    constructRule({
      "border-style": "none",
    }, className)],
  ["x", [
    ["DEFAULT", (_, { variablePrefix, className }) => {
      const [variable, varFn] = customPropertySet(
        "divide-x-reverse",
        variablePrefix,
      );

      return constructRule({
        [variable]: 0,
        "border-right-width": `calc(1px * ${varFn})`,
        "border-left-width": `calc(1px * calc(1 - ${varFn}))`,
      }, className);
    }],
    [
      "reverse",
      (_, { variablePrefix, className }) =>
        constructRule({
          [stringifyCustomProperty("divide-x-reverse", variablePrefix)]: 1,
        }, className),
    ],
    [
      re$PositiveNumber,
      ([, pNumber], { variablePrefix, className }) =>
        parseNumeric(pNumber).map(pxify).map((px) => {
          const [variable, varFn] = customPropertySet(
            "divide-x-reverse",
            variablePrefix,
          );
          return constructRule({
            [variable]: 0,
            "border-right-width": `calc(${px} * ${varFn})`,
            "border-left-width": `calc(${px} * calc(1 - ${varFn}))`,
          }, className);
        }).match({
          some: (v) => v,
          none: undefined,
        }),
    ],
  ]],
  ["y", [
    ["DEFAULT", (_, { variablePrefix, className }) => {
      const [variable, varFn] = customPropertySet(
        "divide-y-reverse",
        variablePrefix,
      );

      return constructRule({
        [variable]: 0,
        "border-top-width": `calc(1px * calc(1 - ${varFn}))`,
        "border-bottom-width": `calc(1px * ${varFn})`,
      }, className);
    }],
    [
      "reverse",
      (_, { variablePrefix, className }) =>
        constructRule({
          [stringifyCustomProperty("divide-y-reverse", variablePrefix)]: 1,
        }, className),
    ],
    [
      re$PositiveNumber,
      ([, pNumber], { variablePrefix, className }) =>
        parseNumeric(pNumber).map(pxify).match({
          some: (px) => {
            const [variable, varFn] = customPropertySet(
              "divide-y-reverse",
              variablePrefix,
            );
            return constructRule({
              [variable]: 0,
              "border-top-width": `calc(${px} * calc(1 - ${varFn}))`,
              "border-bottom-width": `calc(${px} * ${varFn})`,
            }, className);
          },
          none: undefined,
        }),
    ],
  ]],
  [re$AllPer$PositiveNumber, ([, body, numeric], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return parseNumeric(numeric).match({
      some: (number) =>
        parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn).match({
          some: (color) =>
            constructRule({ "border-color": color }, context.className),
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
      some: (color) =>
        constructRule({ "border-color": color }, context.className),
      none: undefined,
    });
  }],
  [
    re$All,
    ([body], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;

      const _color = parseColor(color).map(completionRGBA(1, true))
        .map(rgbFn)
        .match({
          some: (color) => color,
          none: color,
        });

      return constructRule({ "border-color": _color }, context.className);
    },
  ],
];
