import { stringifyCustomProperty } from "../../core/utils/stringify.ts";
import { customPropertySet, pxBy } from "./_utils.ts";
import { rePositiveNumber } from "../../core/utils/regexp.ts";
import type { EntriesSpecifier } from "../../core/types.ts";

const combinator = ">:not([hidden])~:not([hidden])";
export const divide: EntriesSpecifier = [
  ["solid", [{ "border-style": "solid" }, combinator]],
  ["dashed", [{ "border-style": "dashed" }, combinator]],
  ["dotted", [{ "border-style": "dotted" }, combinator]],
  ["double", [{ "border-style": "double" }, combinator]],
  ["none", [{ "border-style": "none" }, combinator]],
  ["x", [
    ["DEFAULT", (_, { variablePrefix }) => {
      const [variable, varFn] = customPropertySet(
        "divide-x-reverse",
        variablePrefix,
      );

      return [{
        [variable]: 0,
        "border-right-width": `calc(1px * ${varFn})`,
        "border-left-width": `calc(1px * calc(1 - ${varFn}))`,
      }, combinator];
    }],
    [
      "reverse",
      (_, { variablePrefix }) => [{
        [stringifyCustomProperty("divide-x-reverse", variablePrefix)]: 1,
      }, combinator],
    ],
    [
      rePositiveNumber,
      ([, pNumber], { variablePrefix }) =>
        pxBy(pNumber, (number) => {
          const [variable, varFn] = customPropertySet(
            "divide-x-reverse",
            variablePrefix,
          );
          return [{
            [variable]: 0,
            "border-right-width": `calc(${number} * ${varFn})`,
            "border-left-width": `calc(${number} * calc(1 - ${varFn}))`,
          }, combinator];
        }),
    ],
  ]],
  ["y", [
    ["DEFAULT", (_, { variablePrefix }) => {
      const [variable, varFn] = customPropertySet(
        "divide-y-reverse",
        variablePrefix,
      );

      return [{
        [variable]: 0,
        "border-top-width": `calc(1px * calc(1 - ${varFn}))`,
        "border-bottom-width": `calc(1px * ${varFn})`,
      }, combinator];
    }],
    [
      "reverse",
      (_, { variablePrefix }) => [{
        [stringifyCustomProperty("divide-y-reverse", variablePrefix)]: 1,
      }, combinator],
    ],
    [
      rePositiveNumber,
      ([, pNumber], { variablePrefix }) =>
        pxBy(pNumber, (px) => {
          const [variable, varFn] = customPropertySet(
            "divide-y-reverse",
            variablePrefix,
          );
          return [{
            [variable]: 0,
            "border-top-width": `calc(${px} * calc(1 - ${varFn}))`,
            "border-bottom-width": `calc(${px} * ${varFn})`,
          }, combinator];
        }),
    ],
  ]],
];
