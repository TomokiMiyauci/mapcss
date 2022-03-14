import { execMatch, re$PositiveNumber } from "../../core/utils/regexp.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import { transformValue } from "./_utils.ts";
import {
  customProperty,
  ratio,
  shortDecimal,
} from "../../core/utils/format.ts";
import { associateWith } from "../../deps.ts";
import type { BlockDefinition, CSSMap } from "../../core/types.ts";

function handleScale(
  properties: string[],
  value: string,
  varPrefix: string,
): BlockDefinition | undefined {
  return parseNumeric(value).map(ratio).map(shortDecimal).match({
    some: (v) => ({
      ...associateWith(
        properties.map((property) => customProperty(property, varPrefix)),
        () => v,
      ),
      transform: transformValue(varPrefix),
    }),
    none: undefined,
  });
}

export const scale: CSSMap = {
  x: {
    "*": (match, { variablePrefix }) =>
      execMatch(match, [
        [
          re$PositiveNumber,
          ([, pNumber]) => handleScale(["scale-x"], pNumber, variablePrefix),
        ],
      ]),
  },
  y: {
    "*": (match, { variablePrefix }) =>
      execMatch(match, [
        [
          re$PositiveNumber,
          ([, pNumber]) => handleScale(["scale-y"], pNumber, variablePrefix),
        ],
      ]),
  },
  "*": (match, { variablePrefix }) =>
    execMatch(match, [
      [
        re$PositiveNumber,
        ([, pNumber]) =>
          handleScale(["scale-x", "scale-y"], pNumber, variablePrefix),
      ],
    ]),
};
