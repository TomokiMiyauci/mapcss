import { reNumeric } from "../../core/utils/regexp.ts";
import { stringifyCustomProperty } from "../../core/utils/stringify.ts";
import { customPropertySet, remBy } from "./_utils.ts";
import type { CSSStatement, EntriesSpecifier } from "../../core/types.ts";

const combinator = ">:not([hidden])~:not([hidden])";
const SPACE_X_REVERSE = "space-x-reverse";
const SPACE_Y_REVERSE = "space-y-reverse";
function handleSpaceX(
  variablePrefix: string,
  value: string,
): CSSStatement {
  const [variable, varFn] = customPropertySet(SPACE_X_REVERSE, variablePrefix);
  return {
    type: "ruleset",
    selector: {
      combinator,
    },
    declaration: {
      [variable]: 0,
      "margin-right": `calc(${value} * ${varFn})`,
      "margin-left": `calc(${value} * calc(1 - ${varFn}))`,
    },
  };
}

function handleSpaceY(
  variablePrefix: string,
  value: string,
): CSSStatement {
  const [variable, varFn] = customPropertySet(SPACE_Y_REVERSE, variablePrefix);
  return {
    type: "ruleset",
    selector: {
      combinator,
    },
    declaration: {
      [variable]: 0,
      "margin-top": `calc(${value} * calc(1 - ${varFn}))`,
      "margin-bottom": `calc(${value} * ${varFn})`,
    },
  };
}

export const space: EntriesSpecifier = [
  ["x", [
    [0, (_, { variablePrefix }) => handleSpaceX(variablePrefix, "0px")],
    ["px", (_, { variablePrefix }) => handleSpaceX(variablePrefix, "1px")],
    ["reverse", (_, { variablePrefix }) => {
      return {
        type: "ruleset",
        selector: {
          combinator,
        },
        declaration: {
          [stringifyCustomProperty(SPACE_X_REVERSE, variablePrefix)]: 1,
        },
      };
    }],
    [
      reNumeric,
      ([, numeric], { variablePrefix }) =>
        remBy(numeric, (rem) => handleSpaceX(variablePrefix, rem)),
    ],
  ]],
  ["y", [
    [0, (_, { variablePrefix }) => handleSpaceY(variablePrefix, "0px")],
    ["px", (_, { variablePrefix }) => handleSpaceY(variablePrefix, "1px")],
    ["reverse", (_, { variablePrefix }) => {
      return {
        type: "ruleset",
        selector: {
          combinator,
        },
        declaration: {
          [stringifyCustomProperty(SPACE_Y_REVERSE, variablePrefix)]: 1,
        },
      };
    }],
    [
      reNumeric,
      ([, numeric], { variablePrefix }) =>
        remBy(numeric, (rem) => handleSpaceY(variablePrefix, rem)),
    ],
  ]],
];
