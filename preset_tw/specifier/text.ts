import { resolveTheme } from "../../core/utils/resolver.ts";
import { isUndefined } from "../../deps.ts";
import {
  re$SlashBracket$,
  reAll,
  reSlashNumber,
} from "../../core/utils/regexp.ts";
import { parseColor, parseNumeric } from "../../core/utils/monad.ts";
import { completionRGBA, ratio, rgbFn } from "../../core/utils/format.ts";
import type { Specifier } from "../../core/types.ts";

function toColor(color: string): { color: string } {
  return { color };
}

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
  ["ellipsis", { "text-overflow": "ellipsis" }],
  ["clip", { "text-overflow": "clip" }],
  [reSlashNumber, ([, body, numeric], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return parseNumeric(numeric).match({
      some: (number) =>
        parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn).match({
          some: toColor,
          none: undefined,
        }),
      none: undefined,
    });
  }],
  [re$SlashBracket$, ([, body, alpha], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;
    return parseColor(color).map(({ r, g, b }) => ({ r, g, b, a: alpha })).map(
      rgbFn,
    ).match({
      some: toColor,
      none: undefined,
    });
  }],
  [
    reAll,
    ([body], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;

      return parseColor(color).map(completionRGBA(1, true))
        .map(rgbFn)
        .match({
          some: toColor,
          none: () => ({ color }),
        });
    },
  ],
];
