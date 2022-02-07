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
  ["clip", {
    border: { "background-clip": "border-box" },
    padding: { "background-clip": "padding-box" },
    content: { "background-clip": "content-box" },
    text: { "background-clip": "text" },
  }],
  ["origin", {
    border: { "background-origin": "border-box" },
    padding: { "background-origin": "padding-box" },
    content: { "background-origin": "content-box" },
  }],
  ["top", { "background-position": "top" }],
  ["bottom", { "background-position": "bottom" }],
  ["center", { "background-position": "center" }],
  ["left", {
    DEFAULT: { "background-position": "left" },
    top: { "background-position": "left top" },
    bottom: { "background-position": "left bottom" },
  }],
  ["right", {
    DEFAULT: { "background-position": "right" },
    top: { "background-position": "right top" },
    bottom: { "background-position": "right bottom" },
  }],
  ["repeat", {
    DEFAULT: { "background-repeat": "repeat" },
    x: { "background-repeat": "repeat-x" },
    y: { "background-repeat": "repeat-y" },
    round: { "background-repeat": "round" },
    space: { "background-repeat": "space" },
  }],
  ["no", {
    repeat: { "background-repeat": "no-repeat" },
  }],
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
