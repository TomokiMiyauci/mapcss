// This module is browser compatible.

import {
  execMatch,
  re$AllPer$PositiveNumber,
  re$Numeric,
} from "../../core/utils/regexp.ts";
import { parseFraction, parseNumeric } from "../../core/utils/monad.ts";
import {
  multiple,
  quoter,
  roundN,
  shortDecimal,
  unit,
} from "../../core/utils/format.ts";
import type { CSSMap } from "../../core/types.ts";
import { handleTransform } from "./_utils.ts";

export const translate: CSSMap = {
  x: {
    0: (_, { variablePrefix }) =>
      handleTransform(["translate-x"], "0px", variablePrefix),
    px: (_, { variablePrefix }) =>
      handleTransform(["translate-x"], "1px", variablePrefix),
    full: (_, { variablePrefix }) =>
      handleTransform(["translate-x"], "100%", variablePrefix),
    "*": ({ id }, { variablePrefix }) =>
      execMatch(id, [
        [
          re$Numeric,
          ([, pNumber]) =>
            parseNumeric(pNumber).map(quoter).map(shortDecimal).map(unit("rem"))
              .match({
                some: (rem) =>
                  handleTransform(["translate-x"], rem, variablePrefix),
                none: undefined,
              }),
        ],
        [
          re$AllPer$PositiveNumber,
          ([, numerator, denominator]) =>
            parseFraction(numerator, denominator).map(multiple(100)).map(
              roundN(6),
            )
              .map(unit("%")).match({
                some: (v) =>
                  handleTransform(["translate-x"], v, variablePrefix),
                none: undefined,
              }),
        ],
      ]),
  },
  y: {
    0: (_, { variablePrefix }) =>
      handleTransform(["translate-y"], "0px", variablePrefix),
    px: (_, { variablePrefix }) =>
      handleTransform(["translate-y"], "1px", variablePrefix),
    full: (_, { variablePrefix }) =>
      handleTransform(["translate-y"], "100%", variablePrefix),
    "*": ({ id }, { variablePrefix }) =>
      execMatch(id, [
        [
          re$AllPer$PositiveNumber,
          ([, numerator, denominator]) =>
            parseFraction(numerator, denominator).map(multiple(100)).map(
              roundN(6),
            )
              .map(unit("%")).match({
                some: (v) =>
                  handleTransform(["translate-y"], v, variablePrefix),
                none: undefined,
              }),
        ],
        [
          re$Numeric,
          ([, pNumber]) =>
            parseNumeric(pNumber).map(quoter).map(shortDecimal).map(unit("rem"))
              .match({
                some: (rem) =>
                  handleTransform(["translate-y"], rem, variablePrefix),
                none: undefined,
              }),
        ],
      ]),
  },
};
