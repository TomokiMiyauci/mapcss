import { matcher, pxify } from "./_utils.ts";
import { resolveTheme } from "../../core/resolve.ts";
import { isUndefined } from "../deps.ts";
import {
  execMatch,
  re$All,
  re$AllPer$PositiveNumber,
  re$AllPerBracket_$,
  re$Numeric,
} from "../../core/utils/regexp.ts";
import { parseColor, parseNumeric } from "../../core/utils/monad.ts";
import { completionRGBA, ratio, rgbFn } from "../../core/utils/format.ts";
import type { CSSMap } from "../../core/types.ts";

function toOutlineColor(color: string): { outlineColor: string } {
  return { outlineColor: color };
}

export const outline: CSSMap = {
  "": { outlineStyle: "solid" },
  none: { outline: "2px solid transparent", "outline-offset": "2px" },
  dashed: { outlineStyle: "dashed" },
  dotted: { outlineStyle: "dotted" },
  double: { outlineStyle: "double" },
  hidden: { outlineStyle: "hidden" },
  offset: {
    "*": ({ id }) =>
      execMatch(id, [
        [
          re$Numeric,
          ([, numeric]) =>
            parseNumeric(numeric).map(pxify).match(matcher("outline-offset")),
        ],
      ]),
  },
  "*": ({ id }, context) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).map(pxify).match(matcher("outline-width")),
      ],
      [re$AllPer$PositiveNumber, ([, body, numeric]) => {
        const color = resolveTheme(body, "color", context);
        if (isUndefined(color)) return;

        return parseNumeric(numeric).match({
          some: (number) =>
            parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn)
              .match({
                some: toOutlineColor,
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
            some: toOutlineColor,
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
              some: toOutlineColor,
              none: () => ({ outlineColor: color }),
            });
        },
      ],
    ]),
};
