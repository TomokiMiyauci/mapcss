import { resolveTheme } from "../../core/resolve.ts";
import { isUndefined } from "../../deps.ts";
import {
  execMatch,
  re$All,
  re$AllPer$PositiveNumber,
  re$AllPerBracket_$,
} from "../../core/utils/regexp.ts";
import { parseColor, parseNumeric } from "../../core/utils/monad.ts";
import { completionRGBA, ratio, rgbFn } from "../../core/utils/format.ts";
import type { CSSMap } from "../../core/types.ts";

function toColor(color: string): { color: string } {
  return { color };
}

export const text: CSSMap = {
  xs: {
    fontSize: "0.75rem",
    lineHeight: "1rem",
  },
  sm: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
  base: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
  },
  lg: {
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
  },
  xl: {
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
  },
  "2xl": {
    fontSize: "1.5rem",
    lineHeight: "2rem",
  },
  "3xl": {
    fontSize: "1.875rem",
    lineHeight: "2.25rem",
  },
  "4xl": {
    fontSize: "2.25rem",
    lineHeight: "2.5rem",
  },
  "5xl": {
    fontSize: "3rem",
    lineHeight: 1,
  },
  "6xl": {
    fontSize: "3.75rem",
    lineHeight: 1,
  },
  "7xl": {
    fontSize: "4.5rem",
    lineHeight: 1,
  },
  "8xl": {
    fontSize: "6rem",
    lineHeight: 1,
  },
  "9xl": {
    fontSize: "8rem",
    lineHeight: 1,
  },
  left: { textAlign: "left" },
  center: { textAlign: "center" },
  right: { textAlign: "right" },
  justify: { textAlign: "justify" },
  ellipsis: { textOverflow: "ellipsis" },
  clip: { textOverflow: "clip" },
  "*": ({ id }, context) =>
    execMatch(id, [
      [re$AllPer$PositiveNumber, ([, body, numeric]) => {
        const color = resolveTheme(body, "color", context);
        if (isUndefined(color)) return;

        return parseNumeric(numeric).match({
          some: (number) =>
            parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn)
              .match({
                some: toColor,
                none: undefined,
              }),
          none: undefined,
        });
      }],
      [re$AllPerBracket_$, ([, body, alpha]) => {
        const color = resolveTheme(body, "color", context);
        if (isUndefined(color)) return;
        return parseColor(color).map(({ r, g, b }) => ({ r, g, b, a: alpha }))
          .map(
            rgbFn,
          ).match({
            some: toColor,
            none: undefined,
          });
      }],
      [
        re$All,
        ([body]) => {
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
    ]),
};
