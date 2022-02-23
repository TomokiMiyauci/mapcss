import { re$PositiveNumber } from "../../core/utils/regexp.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import { transformValue } from "./_utils.ts";
import {
  customProperty,
  ratio,
  shortDecimal,
} from "../../core/utils/format.ts";
import { associateWith } from "../../deps.ts";
import type { BlockDefinition, EntriesSpecifier } from "../../core/types.ts";

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

export const scale: EntriesSpecifier = [
  ["x", [
    [
      re$PositiveNumber,
      ([, pNumber], { variablePrefix }) =>
        handleScale(["scale-x"], pNumber, variablePrefix),
    ],
  ]],
  ["y", [
    [
      re$PositiveNumber,
      ([, pNumber], { variablePrefix }) =>
        handleScale(["scale-y"], pNumber, variablePrefix),
    ],
  ]],
  [
    re$PositiveNumber,
    ([, pNumber], { variablePrefix }) =>
      handleScale(["scale-x", "scale-y"], pNumber, variablePrefix),
  ],
];
