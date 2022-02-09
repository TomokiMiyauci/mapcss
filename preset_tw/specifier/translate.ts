import { reNumeric, reSlashNumber } from "../../core/utils/regexp.ts";
import { parseFraction, parseNumeric } from "../../core/utils/monad.ts";
import {
  multiple,
  quoter,
  roundN,
  shortDecimal,
  unit,
} from "../../core/utils/format.ts";
import type { RecordSpecifier } from "../../core/types.ts";
import { handleTransform } from "./_utils.ts";

export const translate: RecordSpecifier = {
  x: [
    [
      0,
      (_, { variablePrefix }) =>
        handleTransform(["translate-x"], "0px", variablePrefix),
    ],
    [
      "px",
      (_, { variablePrefix }) =>
        handleTransform(["translate-x"], "1px", variablePrefix),
    ],
    [
      "full",
      (_, { variablePrefix }) =>
        handleTransform(["translate-x"], "100%", variablePrefix),
    ],
    [
      reNumeric,
      ([, pNumber], { variablePrefix }) =>
        parseNumeric(pNumber).map(quoter).map(shortDecimal).map(unit("rem"))
          .match({
            some: (rem) =>
              handleTransform(["translate-x"], rem, variablePrefix),
            none: undefined,
          }),
    ],
    [
      reSlashNumber,
      ([, numerator, denominator], { variablePrefix }) =>
        parseFraction(numerator, denominator).map(multiple(100)).map(roundN(6))
          .map(unit("%")).match({
            some: (v) => handleTransform(["translate-x"], v, variablePrefix),
            none: undefined,
          }),
    ],
  ],
  y: [
    [
      0,
      (_, { variablePrefix }) =>
        handleTransform(["translate-y"], "0px", variablePrefix),
    ],
    [
      "px",
      (_, { variablePrefix }) =>
        handleTransform(["translate-y"], "1px", variablePrefix),
    ],
    [
      "full",
      (_, { variablePrefix }) =>
        handleTransform(["translate-y"], "100%", variablePrefix),
    ],
    [
      reSlashNumber,
      ([, numerator, denominator], { variablePrefix }) =>
        parseFraction(numerator, denominator).map(multiple(100)).map(roundN(6))
          .map(unit("%")).match({
            some: (v) => handleTransform(["translate-y"], v, variablePrefix),
            none: undefined,
          }),
    ],
    [
      reNumeric,
      ([, pNumber], { variablePrefix }) =>
        parseNumeric(pNumber).map(quoter).map(shortDecimal).map(unit("rem"))
          .match({
            some: (rem) =>
              handleTransform(["translate-y"], rem, variablePrefix),
            none: undefined,
          }),
    ],
  ],
};
