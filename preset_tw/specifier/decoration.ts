import { reNumeric } from "../../core/utils/regexp.ts";
import { associatePx } from "./_utils.ts";
import { resolveTheme } from "../../core/resolve.ts";
import { isUndefined } from "../../deps.ts";
import {
  re$SlashBracket$,
  reAll,
  reSlashNumber,
} from "../../core/utils/regexp.ts";
import { parseColor, parseNumeric } from "../../core/utils/monad.ts";
import { completionRGBA, ratio, rgbFn } from "../../core/utils/format.ts";
import type { EntriesSpecifier } from "../../core/types.ts";

function toTextDecorationColor(
  color: string,
): { "text-decoration-color": string } {
  return { "text-decoration-color": color };
}

export const decoration: EntriesSpecifier = [
  ["solid", { "text-decoration-style": "solid" }],
  ["double", { "text-decoration-style": "double" }],
  ["dotted", { "text-decoration-style": "dotted" }],
  ["dashed", { "text-decoration-style": "dashed" }],
  ["wavy", { "text-decoration-style": "wavy" }],
  ["auto", { "text-decoration-thickness": "auto" }],
  ["from", {
    "font": { "text-decoration-thickness": "from-font" },
  }],
  [
    reNumeric,
    ([, numeric]) => associatePx(numeric, ["text-decoration-thickness"]),
  ],
  [reSlashNumber, ([, body, numeric], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return parseNumeric(numeric).match({
      some: (number) =>
        parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn).match({
          some: toTextDecorationColor,
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
      some: toTextDecorationColor,
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
          some: toTextDecorationColor,
          none: () => ({ "text-decoration-color": color }),
        });
    },
  ],
];
