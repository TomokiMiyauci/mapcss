// This module is browser compatible.

import { execMatch, re$PositiveNumber } from "../../core/utils/regexp.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import { transformValue } from "./_utils.ts";
import {
  customProperty,
  ratio,
  shortDecimal,
} from "../../core/utils/format.ts";
import { associateWith } from "../deps.ts";
import type { CSSMap, DeclBlock } from "../../core/types.ts";

function handleScale(
  properties: string[],
  value: string,
  varPrefix: string,
): DeclBlock | undefined {
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
    "*": ({ id }, { variablePrefix }) =>
      execMatch(id, [
        [
          re$PositiveNumber,
          ([, pNumber]) => handleScale(["scale-x"], pNumber, variablePrefix),
        ],
      ]),
  },
  y: {
    "*": ({ id }, { variablePrefix }) =>
      execMatch(id, [
        [
          re$PositiveNumber,
          ([, pNumber]) => handleScale(["scale-y"], pNumber, variablePrefix),
        ],
      ]),
  },
  "*": ({ id }, { variablePrefix }) =>
    execMatch(id, [
      [
        re$PositiveNumber,
        ([, pNumber]) =>
          handleScale(["scale-x", "scale-y"], pNumber, variablePrefix),
      ],
    ]),
};
