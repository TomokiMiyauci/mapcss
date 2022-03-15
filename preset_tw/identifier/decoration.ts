import { execMatch, re$Numeric } from "../../core/utils/regexp.ts";
import { matcher, pxify } from "./_utils.ts";
import { resolveTheme } from "../../core/resolve.ts";
import { isUndefined } from "../../deps.ts";
import {
  re$All,
  re$AllPer$PositiveNumber,
  re$AllPerBracket_$,
} from "../../core/utils/regexp.ts";
import { parseColor, parseNumeric } from "../../core/utils/monad.ts";
import { completionRGBA, ratio, rgbFn } from "../../core/utils/format.ts";
import type { CSSMap } from "../../core/types.ts";

function toTextDecorationColor(
  color: string,
): { textDecorationColor: string } {
  return { textDecorationColor: color };
}

export const decoration: CSSMap = {
  solid: { textDecorationStyle: "solid" },
  double: { textDecorationStyle: "double" },
  dotted: { textDecorationStyle: "dotted" },
  dashed: { textDecorationStyle: "dashed" },
  wavy: { textDecorationStyle: "wavy" },
  auto: { textDecorationThickness: "auto" },
  from: {
    font: { textDecorationThickness: "from-font" },
  },
  "*": ({ id }, context) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).map(pxify).match(
            matcher("text-decoration-thickness"),
          ),
      ],
      [re$AllPer$PositiveNumber, ([, body, numeric]) => {
        const color = resolveTheme(body, "color", context);
        if (isUndefined(color)) return;

        return parseNumeric(numeric).match({
          some: (number) =>
            parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn)
              .match({
                some: toTextDecorationColor,
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
            some: toTextDecorationColor,
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
              some: toTextDecorationColor,
              none: () => ({ textDecorationColor: color }),
            });
        },
      ],
    ]),
};
