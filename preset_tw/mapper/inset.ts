import { fractionBy, remBy } from "./_utils.ts";
import { reFraction, reNumeric } from "../../core/utils/regexp.ts";
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
    [0, {
      right: "0px",
      left: "0px",
    }],
    ["px", {
      right: "1px",
      left: "1px",
    }],
    ["auto", { left: "auto", right: "auto" }],
    ["full", {
      right: "100%",
      left: "100%",
    }],
    [
      reNumeric,
      ([, numeric]) => {
        return remBy(numeric, (rem) => ({
          right: rem,
          left: rem,
        }));
      },
    ],
    [reFraction, ([, numerator, denominator]) => {
      return fractionBy(numerator, denominator, (percent) => ({
        right: percent,
        left: percent,
      }));
    }],
  ]],
  ["y", [["px", {
    top: "1px",
    bottom: "1px",
  }], ["auto", {
    top: "auto",
    bottom: "auto",
  }], ["full", {
    top: "100%",
    bottom: "100%",
  }], [0, {
    top: "0px",
    bottom: "0px",
  }], [reNumeric, ([, n]) => {
    return remBy(n, (rem) => ({
      top: rem,
      bottom: rem,
    }));
  }], [reFraction, ([, numerator, denominator]) => {
    return fractionBy(numerator, denominator, (percent) => ({
      top: percent,
      bottom: percent,
    }));
  }]]],
  [reNumeric, ([, n]) => {
    return remBy(n, (rem) => ({
      top: rem,
      right: rem,
      bottom: rem,
      left: rem,
    }));
  }],
  [reFraction, ([, numerator, denominator]) => {
    return fractionBy(numerator, denominator, (percent) => ({
      top: percent,
      right: percent,
      bottom: percent,
      left: percent,
    }));
  }],
];
