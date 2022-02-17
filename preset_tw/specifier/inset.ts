import { matcher, percentize, remify } from "./_utils.ts";
import { parseFraction } from "../../core/utils/monad.ts";
import { associateWith } from "../../deps.ts";
import { reBracket$, reFraction, reNumeric } from "../../core/utils/regexp.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import type { Specifier } from "../../core/types.ts";

export const inset: Specifier = [
  [0, {
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  }],
  ["px", {
    top: "1px",
    right: "1px",
    bottom: "1px",
    left: "1px",
  }],
  ["auto", {
    top: "auto",
    right: "auto",
    bottom: "auto",
    left: "auto",
  }],
  ["full", {
    top: "100%",
    right: "100%",
    bottom: "100%",
    left: "100%",
  }],
  ["x", [
    [0, { right: "0px", left: "0px" }],
    ["px", { right: "1px", left: "1px" }],
    ["auto", { left: "auto", right: "auto" }],
    ["full", { right: "100%", left: "100%" }],
    [
      reNumeric,
      ([, numeric]) =>
        parseNumeric(numeric).andThen(remify).match(
          matcher(["right", "left"]),
        ),
    ],
    [
      reFraction,
      ([, numerator, denominator]) =>
        parseFraction(numerator, denominator).map(percentize).match(
          matcher(["right", "left"]),
        ),
    ],
    [
      reBracket$,
      ([, attr]) => associateWith(["right", "left"], () => attr),
    ],
  ]],
  ["y", [
    ["px", { top: "1px", bottom: "1px" }],
    ["auto", { top: "auto", bottom: "auto" }],
    ["full", { top: "100%", bottom: "100%" }],
    [0, { top: "0px", bottom: "0px" }],
    [reNumeric, ([, numeric]) =>
      parseNumeric(numeric).andThen(remify).match(
        matcher(["top", "bottom"]),
      )],
    [
      reFraction,
      ([, numerator, denominator]) =>
        parseFraction(numerator, denominator).map(percentize).match(
          matcher(["top", "bottom"]),
        ),
    ],
    [
      reBracket$,
      ([, attr]) => associateWith(["top", "bottom"], () => attr),
    ],
  ]],
  [
    reNumeric,
    ([, numeric]) =>
      parseNumeric(numeric).andThen(remify).match(
        matcher(["top", "bottom", "right", "left"]),
      ),
  ],
  [
    reFraction,
    ([, numerator, denominator]) =>
      parseFraction(numerator, denominator).map(percentize).match(
        matcher(["top", "bottom", "right", "left"]),
      ),
  ],
  [
    reBracket$,
    ([, attr]) => associateWith(["top", "bottom", "right", "left"], () => attr),
  ],
];
