import { customPropertySet } from "./_utils.ts";
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

function toBackgroundColor(color: string): { backgroundColor: string } {
  return { backgroundColor: color };
}

function varFnGradientStops(variablePrefix: string): string {
  const [, varFn] = customPropertySet("gradient-stops", variablePrefix);
  return varFn;
}

export const bg: CSSMap = {
  fixed: { backgroundAttachment: "fixed" },
  local: { backgroundAttachment: "local" },
  scroll: { backgroundAttachment: "scroll" },
  clip: {
    border: { backgroundClip: "border-box" },
    padding: { backgroundClip: "padding-box" },
    content: { backgroundClip: "content-box" },
    text: { backgroundClip: "text" },
  },
  origin: {
    border: { backgroundOrigin: "border-box" },
    padding: { backgroundOrigin: "padding-box" },
    content: { backgroundOrigin: "content-box" },
  },
  top: { backgroundPosition: "top" },
  bottom: { backgroundPosition: "bottom" },
  center: { backgroundPosition: "center" },
  left: {
    "": { backgroundPosition: "left" },
    top: { backgroundPosition: "left top" },
    bottom: { backgroundPosition: "left bottom" },
  },
  right: {
    "": { backgroundPosition: "right" },
    top: { backgroundPosition: "right top" },
    bottom: { backgroundPosition: "right bottom" },
  },
  repeat: {
    "": { backgroundRepeat: "repeat" },
    x: { backgroundRepeat: "repeat-x" },
    y: { backgroundRepeat: "repeat-y" },
    round: { backgroundRepeat: "round" },
    space: { backgroundRepeat: "space" },
  },
  no: {
    repeat: { backgroundRepeat: "no-repeat" },
  },
  auto: { backgroundSize: "auto" },
  cover: { backgroundSize: "cover" },
  contain: { backgroundSize: "contain" },
  none: { backgroundImage: "none" },
  blend: {
    normal: { backgroundBlendMode: "normal" },
    multiply: { backgroundBlendMode: "multiply" },
    screen: { backgroundBlendMode: "screen" },
    overlay: { backgroundBlendMode: "overlay" },
    darken: { backgroundBlendMode: "darken" },
    lighten: { backgroundBlendMode: "lighten" },
    difference: { backgroundBlendMode: "difference" },
    exclusion: { backgroundBlendMode: "exclusion" },
    hue: { backgroundBlendMode: "hue" },
    saturation: { backgroundBlendMode: "saturation" },
    luminosity: { backgroundBlendMode: "luminosity" },
    color: {
      "": { backgroundBlendMode: "color" },
      dodge: { backgroundBlendMode: "color-dodge" },
      burn: { backgroundBlendMode: "color-burn" },
    },
    hard: {
      light: { backgroundBlendMode: "hard-light" },
    },
    soft: {
      light: { backgroundBlendMode: "soft-light" },
    },
  },
  gradient: {
    to: {
      t: (_, { variablePrefix }) => ({
        backgroundImage: `linear-gradient(to top, ${
          varFnGradientStops(variablePrefix)
        })`,
      }),
      tr: (_, { variablePrefix }) => ({
        backgroundImage: `linear-gradient(to top right, ${
          varFnGradientStops(variablePrefix)
        })`,
      }),
      r: (_, { variablePrefix }) => ({
        backgroundImage: `linear-gradient(to right, ${
          varFnGradientStops(variablePrefix)
        })`,
      }),
      br: (_, { variablePrefix }) => ({
        backgroundImage: `linear-gradient(to bottom right, ${
          varFnGradientStops(variablePrefix)
        })`,
      }),
      b: (_, { variablePrefix }) => ({
        backgroundImage: `linear-gradient(to bottom, ${
          varFnGradientStops(variablePrefix)
        })`,
      }),
      bl: (_, { variablePrefix }) => ({
        backgroundImage: `linear-gradient(to bottom left, ${
          varFnGradientStops(variablePrefix)
        })`,
      }),
      l: (_, { variablePrefix }) => ({
        backgroundImage: `linear-gradient(to left, ${
          varFnGradientStops(variablePrefix)
        })`,
      }),
      tl: (_, { variablePrefix }) => ({
        backgroundImage: `linear-gradient(to top left, ${
          varFnGradientStops(variablePrefix)
        })`,
      }),
    },
  },

  "*": (match, context) =>
    execMatch(match, [
      [re$AllPer$PositiveNumber, ([, body, numeric]) => {
        const color = resolveTheme(body, "color", context);
        if (isUndefined(color)) return;

        return parseNumeric(numeric).match({
          some: (number) =>
            parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn)
              .match({
                some: toBackgroundColor,
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
            some: toBackgroundColor,
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
              some: toBackgroundColor,
              none: () => ({ backgroundColor: color }),
            });
        },
      ],
    ]),
};
