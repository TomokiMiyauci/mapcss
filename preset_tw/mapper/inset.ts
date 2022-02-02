import { associatePercent, associateRem } from "./_utils.ts";
import { associateWith } from "../../deps.ts";
import { reBracket$, reFraction, reNumeric } from "../../core/utils/regexp.ts";
import type { Mapper } from "../../core/types.ts";

export const inset: Mapper = [
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
      ([, numeric]) => associateRem(["right", "left"], numeric),
    ],
    [
      reFraction,
      ([, numerator, denominator]) =>
        associatePercent(["right", "left"], numerator, denominator),
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
    [reNumeric, ([, numeric]) => associateRem(["top", "bottom"], numeric)],
    [
      reFraction,
      ([, numerator, denominator]) =>
        associatePercent(["top", "bottom"], numerator, denominator),
    ],
    [
      reBracket$,
      ([, attr]) => associateWith(["top", "bottom"], () => attr),
    ],
  ]],
  [
    reNumeric,
    ([, numeric]) => associateRem(["top", "bottom", "right", "left"], numeric),
  ],
  [
    reFraction,
    ([, numerator, denominator]) =>
      associatePercent(
        ["top", "bottom", "right", "left"],
        numerator,
        denominator,
      ),
  ],
  [
    reBracket$,
    ([, attr]) => associateWith(["top", "bottom", "right", "left"], () => attr),
  ],
];
