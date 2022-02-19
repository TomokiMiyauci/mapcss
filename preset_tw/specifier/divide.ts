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
import type { EntriesSpecifier } from "../../core/types.ts";

const combinator = ">:not([hidden])~:not([hidden])";

function combine(selector: string): string {
  return `${selector}${combinator}`;
}
export const divide: EntriesSpecifier = [
  ["solid", {
    declaration: { "border-style": "solid" },
    selector: combine,
    type: "ruleset",
  }],
  ["dashed", {
    type: "ruleset",
    selector: combine,
    declaration: { "border-style": "dashed" },
  }],
  ["dotted", {
    type: "ruleset",
    selector: combine,
    declaration: { "border-style": "dotted" },
  }],
  ["double", {
    type: "ruleset",
    selector: combine,
    declaration: { "border-style": "double" },
  }],
  ["none", {
    type: "ruleset",
    selector: combine,
    declaration: { "border-style": "none" },
  }],
  ["x", [
    ["DEFAULT", (_, { variablePrefix }) => {
      const [variable, varFn] = customPropertySet(
        "divide-x-reverse",
        variablePrefix,
      );

      return {
        type: "ruleset",
        selector: combine,
        declaration: {
          [variable]: 0,
          "border-right-width": `calc(1px * ${varFn})`,
          "border-left-width": `calc(1px * calc(1 - ${varFn}))`,
        },
      };
    }],
    [
      "reverse",
      (_, { variablePrefix }) => ({
        type: "ruleset",
        selector: combine,
        declaration: {
          [stringifyCustomProperty("divide-x-reverse", variablePrefix)]: 1,
        },
      }),
    ],
    [
      re$PositiveNumber,
      ([, pNumber], { variablePrefix }) =>
        parseNumeric(pNumber).map(pxify).map((px) => {
          const [variable, varFn] = customPropertySet(
            "divide-x-reverse",
            variablePrefix,
          );
          return {
            type: "ruleset" as const,
            selector: combine,
            declaration: {
              [variable]: 0,
              "border-right-width": `calc(${px} * ${varFn})`,
              "border-left-width": `calc(${px} * calc(1 - ${varFn}))`,
            },
          };
        }).match({
          some: (v) => v,
          none: undefined,
        }),
    ],
  ]],
  ["y", [
    ["DEFAULT", (_, { variablePrefix }) => {
      const [variable, varFn] = customPropertySet(
        "divide-y-reverse",
        variablePrefix,
      );

      return {
        type: "ruleset",
        selector: combine,
        declaration: {
          [variable]: 0,
          "border-top-width": `calc(1px * calc(1 - ${varFn}))`,
          "border-bottom-width": `calc(1px * ${varFn})`,
        },
      };
    }],
    [
      "reverse",
      (_, { variablePrefix }) => ({
        type: "ruleset",
        selector: combine,
        declaration: {
          [stringifyCustomProperty("divide-y-reverse", variablePrefix)]: 1,
        },
      }),
    ],
    [
      re$PositiveNumber,
      ([, pNumber], { variablePrefix }) =>
        parseNumeric(pNumber).map(pxify).match({
          some: (px) => {
            const [variable, varFn] = customPropertySet(
              "divide-y-reverse",
              variablePrefix,
            );
            return {
              type: "ruleset",
              selector: combine,
              declaration: {
                [variable]: 0,
                "border-top-width": `calc(${px} * calc(1 - ${varFn}))`,
                "border-bottom-width": `calc(${px} * ${varFn})`,
              },
            };
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
          some: (color) => ({
            type: "ruleset",
            selector: combine,
            declaration: { "border-color": color },
          }),
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
      some: (color) => ({
        type: "ruleset",
        selector: combine,
        declaration: { "border-color": color },
      }),
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
          some: (color) => ({
            type: "ruleset",
            selector: combine,
            declaration: { "border-color": color },
          }),
          none: {
            type: "ruleset",
            selector: combine,
            declaration: { "border-color": color },
          },
        });
    },
  ],
];
