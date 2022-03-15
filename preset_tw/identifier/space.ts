import { execMatch, re$Numeric, reBracket_$ } from "../../core/utils/regexp.ts";
import { stringifyCustomProperty } from "../../core/utils/format.ts";
import { customPropertySet, remify } from "./_utils.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import type { CSSDefinition, CSSMap } from "../../core/types.ts";

const combinator = ">:not([hidden])~:not([hidden])";
const SPACE_X_REVERSE = "space-x-reverse";
const SPACE_Y_REVERSE = "space-y-reverse";

function combine(selector: string): string {
  return `${selector}${combinator}`;
}

function handleSpaceX(
  variablePrefix: string,
  value: string,
  className: string,
): CSSDefinition {
  const [variable, varFn] = customPropertySet(SPACE_X_REVERSE, variablePrefix);
  return {
    type: "css",
    value: {
      [className]: {
        [variable]: 0,
        "margin-right": `calc(${value} * ${varFn})`,
        "margin-left": `calc(${value} * calc(1 - ${varFn}))`,
      },
    },
  };
}

function handleSpaceY(
  variablePrefix: string,
  value: string,
  className: string,
): CSSDefinition {
  const [variable, varFn] = customPropertySet(SPACE_Y_REVERSE, variablePrefix);
  return {
    type: "css",
    value: {
      [className]: {
        [variable]: 0,
        "margin-top": `calc(${value} * calc(1 - ${varFn}))`,
        "margin-bottom": `calc(${value} * ${varFn})`,
      },
    },
  };
}

export const space: CSSMap = {
  x: {
    0: (_, { variablePrefix, className }) =>
      handleSpaceX(variablePrefix, "0px", combine(className)),
    px: (_, { variablePrefix, className }) =>
      handleSpaceX(variablePrefix, "1px", combine(className)),
    reverse: (_, { variablePrefix, className }) => ({
      type: "css",
      value: {
        [combine(className)]: {
          [stringifyCustomProperty(SPACE_X_REVERSE, variablePrefix)]: 1,
        },
      },
    }),
    "*": ({ id }, { variablePrefix, className }) =>
      execMatch(id, [
        [
          re$Numeric,
          ([, numeric]) =>
            parseNumeric(numeric).andThen(remify).match({
              some: (rem) =>
                handleSpaceX(variablePrefix, rem, combine(className)),
              none: undefined,
            }),
        ],
        [
          reBracket_$,
          ([, arbitrary]) =>
            handleSpaceX(variablePrefix, arbitrary, combine(className)),
        ],
      ]),
  },
  y: {
    0: (_, { variablePrefix, className }) =>
      handleSpaceY(variablePrefix, "0px", combine(className)),
    px: (_, { variablePrefix, className }) =>
      handleSpaceY(variablePrefix, "1px", combine(className)),
    reverse: (_, { variablePrefix, className }) => ({
      type: "css",
      value: {
        [combine(className)]: {
          [stringifyCustomProperty(SPACE_Y_REVERSE, variablePrefix)]: 1,
        },
      },
    }),
    "*": ({ id }, { variablePrefix, className }) =>
      execMatch(id, [
        [
          re$Numeric,
          ([, numeric]) =>
            parseNumeric(numeric).andThen(remify).match({
              some: (rem) =>
                handleSpaceY(variablePrefix, rem, combine(className)),
              none: undefined,
            }),
        ],
        [
          reBracket_$,
          ([, arbitrary]) =>
            handleSpaceY(variablePrefix, arbitrary, combine(className)),
        ],
      ]),
  },
};
