import { resolveTheme } from "../../core/utils/resolver.ts";
import { colorByRGBA, fillRGBA, numericBy } from "./_utils.ts";
import { isUndefined } from "../../deps.ts";
import { stringifyRGBA } from "../../core/utils/color.ts";
import { reAll, reSlashNumber } from "../../core/utils/regexp.ts";
import type { Specifier } from "../../core/types.ts";

export const text: Specifier = [
  ["xs", {
    "font-size": "0.75rem",
    "line-height": "1rem",
  }],
  ["sm", {
    "font-size": "0.875rem",
    "line-height": "1.25rem",
  }],
  ["base", {
    "font-size": "1rem",
    "line-height": "1.5rem",
  }],
  ["lg", {
    "font-size": "1.125rem",
    "line-height": "1.75rem",
  }],
  ["xl", {
    "font-size": "1.25rem",
    "line-height": "1.75rem",
  }],
  ["2xl", {
    "font-size": "1.5rem",
    "line-height": "2rem",
  }],
  ["3xl", {
    "font-size": "1.875rem",
    "line-height": "2.25rem",
  }],
  ["4xl", {
    "font-size": "2.25rem",
    "line-height": "2.5rem",
  }],
  ["5xl", {
    "font-size": "3rem",
    "line-height": 1,
  }],
  ["6xl", {
    "font-size": "3.75rem",
    "line-height": 1,
  }],
  ["7xl", {
    "font-size": "4.5rem",
    "line-height": 1,
  }],
  ["8xl", {
    "font-size": "6rem",
    "line-height": 1,
  }],
  ["9xl", {
    "font-size": "8rem",
    "line-height": 1,
  }],
  ["left", {
    "text-align": "left",
  }],
  ["center", {
    "text-align": "center",
  }],
  ["right", {
    "text-align": "right",
  }],
  ["justify", {
    "text-align": "justify",
  }],
  [reSlashNumber, ([, body, numeric], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return numericBy(numeric, (number) =>
      colorByRGBA(color, (rgba) => ({
        color: stringifyRGBA(fillRGBA(rgba, number / 100)),
      })));
  }],
  [
    reAll,
    ([body], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;

      return colorByRGBA(color, (rgba) => ({
        color: stringifyRGBA(fillRGBA(rgba)),
      }), (raw) => ({
        color: raw,
      }));
    },
  ],
];
