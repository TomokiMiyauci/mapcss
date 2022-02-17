import { matcher, pxify } from "./_utils.ts";
import { resolveTheme } from "../../core/resolve.ts";
import { isUndefined } from "../../deps.ts";
import {
  re$SlashBracket$,
  reAll,
  reNumeric,
  reSlashNumber,
} from "../../core/utils/regexp.ts";
import { parseColor, parseNumeric } from "../../core/utils/monad.ts";
import { completionRGBA, ratio, rgbFn } from "../../core/utils/format.ts";
import type { Specifier } from "../../core/types.ts";

function toOutlineColor(color: string): { "outline-color": string } {
  return { "outline-color": color };
}

export const outline: Specifier = [
  ["DEFAULT", { "outline-style": "solid" }],
  ["none", { outline: "2px solid transparent", "outline-offset": "2px" }],
  ["dashed", { "outline-style": "dashed" }],
  ["dotted", { "outline-style": "dotted" }],
  ["double", { "outline-style": "double" }],
  ["hidden", { "outline-style": "hidden" }],
  ["offset", [[
    reNumeric,
    ([, numeric]) =>
      parseNumeric(numeric).map(pxify).match(matcher("outline-offset")),
  ]]],

  [
    reNumeric,
    ([, numeric]) =>
      parseNumeric(numeric).map(pxify).match(matcher("outline-width")),
  ],
  [reSlashNumber, ([, body, numeric], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return parseNumeric(numeric).match({
      some: (number) =>
        parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn).match({
          some: toOutlineColor,
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
      some: toOutlineColor,
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
          some: toOutlineColor,
          none: () => ({ "outline-color": color }),
        });
    },
  ],
];
