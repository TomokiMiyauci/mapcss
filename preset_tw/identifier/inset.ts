import { matcher, percentize, remify } from "./_utils.ts";
import { parseFraction } from "../../core/utils/monad.ts";
import { associateWith } from "../../deps.ts";
import {
  execMatch,
  re$Numeric,
  re$PositiveNumberPer$PositiveNumber,
  reBracket_$,
} from "../../core/utils/regexp.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import type { CSSMap } from "../../core/types.ts";

export const inset: CSSMap = {
  0: {
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  },
  px: {
    top: "1px",
    right: "1px",
    bottom: "1px",
    left: "1px",
  },
  auto: {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto",
  },
  full: {
    top: "100%",
    right: "100%",
    bottom: "100%",
    left: "100%",
  },
  x: {
    0: { right: "0px", left: "0px" },
    px: { right: "1px", left: "1px" },
    auto: { left: "auto", right: "auto" },
    full: { right: "100%", left: "100%" },
    "*": ({ id }) =>
      execMatch(id, [
        [
          re$Numeric,
          ([, numeric]) =>
            parseNumeric(numeric).andThen(remify).match(
              matcher(["right", "left"]),
            ),
        ],
        [
          re$PositiveNumberPer$PositiveNumber,
          ([, numerator, denominator]) =>
            parseFraction(numerator, denominator).map(percentize).match(
              matcher(["right", "left"]),
            ),
        ],
        [
          reBracket_$,
          ([, attr]) => associateWith(["right", "left"], () => attr),
        ],
      ]),
  },
  y: {
    0: { top: "0px", bottom: "0px" },
    px: { top: "1px", bottom: "1px" },
    auto: { top: "auto", bottom: "auto" },
    full: { top: "100%", bottom: "100%" },
    "*": ({ id }) =>
      execMatch(id, [
        [re$Numeric, ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(
            matcher(["top", "bottom"]),
          )],
        [
          re$PositiveNumberPer$PositiveNumber,
          ([, numerator, denominator]) =>
            parseFraction(numerator, denominator).map(percentize).match(
              matcher(["top", "bottom"]),
            ),
        ],
        [
          reBracket_$,
          ([, attr]) => associateWith(["top", "bottom"], () => attr),
        ],
      ]),
  },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(
            matcher(["top", "bottom", "right", "left"]),
          ),
      ],
      [
        re$PositiveNumberPer$PositiveNumber,
        ([, numerator, denominator]) =>
          parseFraction(numerator, denominator).map(percentize).match(
            matcher(["top", "bottom", "right", "left"]),
          ),
      ],
      [
        reBracket_$,
        ([, attr]) =>
          associateWith(["top", "bottom", "right", "left"], () => attr),
      ],
    ]),
};
