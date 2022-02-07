import { resolveTheme } from "../../core/utils/resolver.ts";
import { colorByRGBA, fillRGBA, numericBy } from "./_utils.ts";
import { isUndefined } from "../../deps.ts";
import { stringifyRGBA } from "../../core/utils/color.ts";
import { reAll, reSlashNumber } from "../../core/utils/regexp.ts";
import type { Specifier } from "../../core/types.ts";

export const bg: Specifier = [
  ["fixed", { "background-attachment": "fixed" }],
  ["local", { "background-attachment": "local" }],
  ["scroll", { "background-attachment": "scroll" }],
  [reSlashNumber, ([, body, numeric], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return numericBy(numeric, (number) =>
      colorByRGBA(color, (rgba) => ({
        "background-color": stringifyRGBA(fillRGBA(rgba, number / 100)),
      })));
  }],
  [
    reAll,
    ([body], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;

      return colorByRGBA(color, (rgba) => ({
        "background-color": stringifyRGBA(fillRGBA(rgba)),
      }), (raw) => ({
        "background-color": raw,
      }));
    },
  ],
];
