import { customPropertySet } from "./_utils.ts";
import { resolveTheme } from "../../core/resolve.ts";
import { isUndefined } from "../../deps.ts";
import {
  re$All,
  re$AllPer$PositiveNumber,
  re$AllPerBracket_$,
} from "../../core/utils/regexp.ts";
import { parseColor, parseNumeric } from "../../core/utils/monad.ts";
import { completionRGBA, ratio, rgbFn } from "../../core/utils/format.ts";
import type { Specifier } from "../../core/types.ts";

function toBackgroundColor(color: string): { "background-color": string } {
  return { "background-color": color };
}

function varFnGradientStops(variablePrefix: string): string {
  const [, varFn] = customPropertySet("gradient-stops", variablePrefix);
  return varFn;
}

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
  ["auto", { "background-size": "auto" }],
  ["cover", { "background-size": "cover" }],
  ["contain", { "background-size": "contain" }],
  ["none", { "background-image": "none" }],
  ["blend", {
    normal: { "background-blend-mode": "normal" },
    multiply: { "background-blend-mode": "multiply" },
    screen: { "background-blend-mode": "screen" },
    overlay: { "background-blend-mode": "overlay" },
    darken: { "background-blend-mode": "darken" },
    lighten: { "background-blend-mode": "lighten" },
    difference: { "background-blend-mode": "difference" },
    exclusion: { "background-blend-mode": "exclusion" },
    hue: { "background-blend-mode": "hue" },
    saturation: { "background-blend-mode": "saturation" },
    luminosity: { "background-blend-mode": "luminosity" },
    color: {
      DEFAULT: { "background-blend-mode": "color" },
      dodge: { "background-blend-mode": "color-dodge" },
      burn: { "background-blend-mode": "color-burn" },
    },
    hard: {
      light: { "background-blend-mode": "hard-light" },
    },
    soft: {
      light: { "background-blend-mode": "soft-light" },
    },
  }],
  ["gradient", {
    to: {
      t: (_, { variablePrefix }) => ({
        "background-image": `linear-gradient(to top, ${
          varFnGradientStops(variablePrefix)
        })`,
      }),
      tr: (_, { variablePrefix }) => ({
        "background-image": `linear-gradient(to top right, ${
          varFnGradientStops(variablePrefix)
        })`,
      }),
      r: (_, { variablePrefix }) => ({
        "background-image": `linear-gradient(to right, ${
          varFnGradientStops(variablePrefix)
        })`,
      }),
      br: (_, { variablePrefix }) => ({
        "background-image": `linear-gradient(to bottom right, ${
          varFnGradientStops(variablePrefix)
        })`,
      }),
      b: (_, { variablePrefix }) => ({
        "background-image": `linear-gradient(to bottom, ${
          varFnGradientStops(variablePrefix)
        })`,
      }),
      bl: (_, { variablePrefix }) => ({
        "background-image": `linear-gradient(to bottom left, ${
          varFnGradientStops(variablePrefix)
        })`,
      }),
      l: (_, { variablePrefix }) => ({
        "background-image": `linear-gradient(to left, ${
          varFnGradientStops(variablePrefix)
        })`,
      }),
      tl: (_, { variablePrefix }) => ({
        "background-image": `linear-gradient(to top left, ${
          varFnGradientStops(variablePrefix)
        })`,
      }),
    },
  }],

  [re$AllPer$PositiveNumber, ([, body, numeric], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return parseNumeric(numeric).match({
      some: (number) =>
        parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn).match({
          some: toBackgroundColor,
          none: undefined,
        }),
      none: undefined,
    });
  }],
  [re$AllPerBracket_$, ([, body, alpha], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;
    return parseColor(color).map(({ r, g, b }) => ({ r, g, b, a: alpha })).map(
      rgbFn,
    ).match({
      some: toBackgroundColor,
      none: undefined,
    });
  }],
  [
    re$All,
    ([body], context) => {
      const color = resolveTheme(body, "color", context);
      if (isUndefined(color)) return;

      return parseColor(color).map(completionRGBA(1, true))
        .map(rgbFn)
        .match({
          some: toBackgroundColor,
          none: () => ({ "background-color": color }),
        });
    },
  ],
];
