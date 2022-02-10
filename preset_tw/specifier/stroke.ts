import { rePositiveNumber } from "../../core/utils/regexp.ts";
import { resolveTheme } from "../../core/utils/resolver.ts";
import { isUndefined } from "../../deps.ts";
import {
  re$SlashBracket$,
  reAll,
  reSlashNumber,
} from "../../core/utils/regexp.ts";
import { parseColor, parseNumeric } from "../../core/utils/monad.ts";
import { completionRGBA, ratio, rgbFn } from "../../core/utils/format.ts";
import type { EntriesSpecifier } from "../../core/types.ts";

function toStroke(color: string) {
  return { stroke: color };
}

export const stroke: EntriesSpecifier = [
  [rePositiveNumber, ([, pNumber]) =>
    parseNumeric(pNumber).match({
      some: (number) => ({ "stroke-width": number }),
      none: undefined,
    })],

  [reSlashNumber, ([, body, numeric], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return parseNumeric(numeric).match({
      some: (number) =>
        parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn).match({
          some: toStroke,
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
      some: toStroke,
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
          some: toStroke,
          none: () => toStroke(color),
        });
    },
  ],
];
