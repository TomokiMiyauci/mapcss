import { stringifyCustomProperty } from "../../core/utils/stringify.ts";
import { customPropertySet } from "./_utils.ts";
import { pxBy } from "./_utils.ts";
import { resolveTheme } from "../../core/resolve.ts";
import { isUndefined } from "../../deps.ts";
import {
  re$SlashBracket$,
  reAll,
  rePositiveNumber,
  reSlashNumber,
} from "../../core/utils/regexp.ts";
import { parseColor, parseNumeric } from "../../core/utils/monad.ts";
import { completionRGBA, ratio, rgbFn } from "../../core/utils/format.ts";
import type { EntriesSpecifier } from "../../core/types.ts";

const combinator = ">:not([hidden])~:not([hidden])";
export const divide: EntriesSpecifier = [
  ["solid", {
    declaration: { "border-style": "solid" },
    selector: { combinator },
    type: "ruleset",
  }],
  ["dashed", {
    type: "ruleset",
    selector: { combinator },
    declaration: { "border-style": "dashed" },
  }],
  ["dotted", {
    type: "ruleset",
    selector: { combinator },
    declaration: { "border-style": "dotted" },
  }],
  ["double", {
    type: "ruleset",
    selector: {
      combinator,
    },
    declaration: { "border-style": "double" },
  }],
  ["none", {
    type: "ruleset",
    selector: { combinator },
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
        selector: {
          combinator,
        },
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
        selector: {
          combinator,
        },
        declaration: {
          [stringifyCustomProperty("divide-x-reverse", variablePrefix)]: 1,
        },
      }),
    ],
    [
      rePositiveNumber,
      ([, pNumber], { variablePrefix }) =>
        pxBy(pNumber, (number) => {
          const [variable, varFn] = customPropertySet(
            "divide-x-reverse",
            variablePrefix,
          );
          return {
            type: "ruleset",
            selector: { combinator },
            declaration: {
              [variable]: 0,
              "border-right-width": `calc(${number} * ${varFn})`,
              "border-left-width": `calc(${number} * calc(1 - ${varFn}))`,
            },
          };
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
        selector: {
          combinator,
        },
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
        selector: {
          combinator,
        },
        declaration: {
          [stringifyCustomProperty("divide-y-reverse", variablePrefix)]: 1,
        },
      }),
    ],
    [
      rePositiveNumber,
      ([, pNumber], { variablePrefix }) =>
        pxBy(pNumber, (px) => {
          const [variable, varFn] = customPropertySet(
            "divide-y-reverse",
            variablePrefix,
          );
          return {
            type: "ruleset",
            selector: {
              combinator,
            },
            declaration: {
              [variable]: 0,
              "border-top-width": `calc(${px} * calc(1 - ${varFn}))`,
              "border-bottom-width": `calc(${px} * ${varFn})`,
            },
          };
        }),
    ],
  ]],
  [reSlashNumber, ([, body, numeric], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return parseNumeric(numeric).match({
      some: (number) =>
        parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn).match({
          some: (color) => ({
            type: "ruleset",
            selector: {
              combinator,
            },
            declaration: { "border-color": color },
          }),
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
      some: (color) => ({
        type: "ruleset",
        selector: { combinator },
        declaration: { "border-color": color },
      }),
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
          some: (color) => ({
            type: "ruleset",
            selector: {
              combinator,
            },
            declaration: { "border-color": color },
          }),
          none: {
            type: "ruleset",
            selector: {
              combinator,
            },
            declaration: { "border-color": color },
          },
        });
    },
  ],
];
