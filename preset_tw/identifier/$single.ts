// This module is browser compatible.

import { filterValue, handleFilter } from "./_filter_utils.ts";
import {
  parseColor,
  parseFraction,
  parseNumeric,
  per,
} from "../../core/utils/monad.ts";
import {
  completionRGBA,
  customProperty,
  ratio,
  rgbFn,
  shortDecimal,
  unit,
} from "../../core/utils/format.ts";
import type { CSSMap, DeclBlock } from "../../core/types.ts";
import {
  customPropertySet,
  handleTransform,
  matcher,
  percentize,
  remify,
  transformValue,
} from "./_utils.ts";
import { resolveTheme } from "../../core/resolve.ts";
import { associateWith, isUndefined } from "../deps.ts";
import {
  execMatch,
  re$All,
  re$AllPer$PositiveNumber,
  re$AllPerBracket_$,
  re$Numeric,
  re$PositiveNumber,
  re$PositiveNumberPer$PositiveNumber,
  reBracket_$,
} from "../../core/utils/regexp.ts";

export const align: CSSMap = {
  baseline: { verticalAlign: "baseline" },
  top: { verticalAlign: "top" },
  middle: { verticalAlign: "middle" },
  bottom: { verticalAlign: "bottom" },
  text: {
    top: { verticalAlign: "text-top" },
    bottom: { verticalAlign: "text-bottom" },
  },
  sub: { verticalAlign: "sub" },
  super: { verticalAlign: "super" },
};

export const aspect: CSSMap = {
  auto: { aspectRatio: "auto" },
  square: { aspectRatio: "1 / 1" },
  video: { aspectRatio: "16 / 9" },
  "*": ({ id }) =>
    execMatch(id, [
      [reBracket_$, ([, body]) => ({ aspectRatio: body })],
    ]),
};

export const basis: CSSMap = {
  0: { flexBasis: "0px" },
  px: { flexBasis: "1px" },
  auto: { flexBasis: "auto" },
  full: { flexBasis: "100%" },
  "*": ({ id }) =>
    execMatch(id, [[
      re$Numeric,
      ([, numeric]) =>
        parseNumeric(numeric).andThen(remify).match(matcher("flex-basis")),
    ], [
      re$AllPer$PositiveNumber,
      ([, numerator, denominator]) =>
        parseFraction(numerator, denominator).map(percentize).match(
          matcher(["flex-basis"]),
        ),
    ], [reBracket_$, ([, arbitrary]) => ({ "flex-basis": arbitrary })]]),
};

export const block: DeclBlock = { display: "block" };

export const bottom: CSSMap = {
  0: { bottom: "0px" },
  px: { bottom: "1px" },
  auto: { bottom: "auto" },
  full: { bottom: "100%" },
  "*": ({ id }) =>
    execMatch(id, [[
      re$PositiveNumberPer$PositiveNumber,
      ([, numerator, denominator]) =>
        parseFraction(numerator, denominator).map(percentize).match(
          matcher(["bottom"]),
        ),
    ], [
      re$Numeric,
      ([, numeric]) =>
        parseNumeric(numeric).andThen(remify).match(matcher(["bottom"])),
    ], [
      reBracket_$,
      ([, attr]) => ({ bottom: attr }),
    ]]),
};

export const container: CSSMap = {
  "": (_, context) => {
    const SCREEN = "screen";
    const sm = resolveTheme("sm", SCREEN, context);
    const md = resolveTheme("md", SCREEN, context);
    const lg = resolveTheme("lg", SCREEN, context);
    const xl = resolveTheme("xl", SCREEN, context);
    const $2xl = resolveTheme("2xl", SCREEN, context);

    const { className } = context;
    const media = (size: string) => ({
      [`@media (min-width: ${size})`]: { [className]: { "max-width": size } },
    });

    if (sm && md && lg && xl && $2xl) {
      return {
        type: "css",
        value: {
          [className]: {
            width: "100%",
          },
          ...media(sm),
          ...media(md),
          ...media(lg),
          ...media(xl),
          ...media($2xl),
        },
      };
    }
  },
};

export const clear: CSSMap = {
  right: { clear: "right" },
  left: { clear: "left" },
  both: { clear: "both" },
  none: { clear: "none" },
};
export const columns: CSSMap = {
  auto: { columns: "auto" },
  "3xs": { columns: "16rem" },
  "2xs": { columns: "18rem" },
  xs: { columns: "20rem" },
  sm: { columns: "24rem" },
  md: { columns: "28rem" },
  lg: { columns: "32rem" },
  xl: { columns: "36rem" },
  "2xl": { columns: "42rem" },
  "3xl": { columns: "48rem" },
  "4xl": { columns: "56rem" },
  "5xl": { columns: "64rem" },
  "6xl": { columns: "72rem" },
  "7xl": { columns: "80rem" },
  "*": ({ id }) =>
    execMatch(id, [[
      re$PositiveNumber,
      ([, n]) => parseNumeric(n).match(matcher("columns")),
    ], [reBracket_$, ([, arbitrary]) => ({ "columns": arbitrary })]]),
};

export const float: CSSMap = {
  right: { float: "right" },
  left: { float: "left" },
  none: { float: "none" },
};

export const grow: CSSMap = {
  "": { flexGrow: 1 },
  "*": ({ id }) =>
    execMatch(id, [[
      re$PositiveNumber,
      ([, pNumber]) => parseNumeric(pNumber).match(matcher("flex-grow")),
    ], [reBracket_$, ([, arbitrary]) => ({ flexGrow: arbitrary })]]),
};

export const h: CSSMap = {
  0: { height: "0px" },
  px: { height: "1px" },
  auto: { height: "auto" },
  full: { height: "100%" },
  screen: { height: "100vh" },
  min: { height: "min-content" },
  max: { height: "max-content" },
  fit: { height: "fit-content" },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify)
            .match(
              matcher(["height"]),
            ),
      ],
      [
        re$PositiveNumberPer$PositiveNumber,
        ([, numerator, denominator]) =>
          parseFraction(numerator, denominator).map(percentize)
            .match(matcher(["height"])),
      ],
      [reBracket_$, ([, body]) => ({ height: body })],
    ]),
};

export const indent: CSSMap = {
  0: { textIndent: "0px" },
  px: { textIndent: "1px" },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("text-indent")),
      ],
      [reBracket_$, ([, attr]) => ({ textIndent: attr })],
    ]),
};

export const inline: CSSMap = {
  "": { display: "inline" },
  block: { display: "inline-block" },
  flex: { display: "inline-flex" },
  table: { display: "inline-table" },
  grid: { display: "inline-grid" },
};
export const isolate: DeclBlock = { isolation: "isolate" };
export const isolation: CSSMap = {
  auto: { isolation: "auto" },
};
export const items: CSSMap = {
  center: { alignItems: "center" },
  start: { alignItems: "flex-start" },
  end: { alignItems: "flex-end" },
  baseline: { alignItems: "baseline" },
  stretch: { alignItems: "stretch" },
};
export const leading: CSSMap = {
  none: { lineHeight: 1 },
  tight: { lineHeight: 1.25 },
  snug: { lineHeight: 1.375 },
  normal: { lineHeight: 1.5 },
  relaxed: { lineHeight: 1.625 },
  loose: { lineHeight: 2 },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$PositiveNumber,
        ([, number]) =>
          parseNumeric(number).andThen(remify).match(matcher("line-height")),
      ],
      [reBracket_$, ([, attr]) => ({ lineHeight: attr })],
    ]),
};

export const left: CSSMap = {
  0: { left: "0px" },
  px: { left: "1px" },
  auto: { left: "auto" },
  full: { left: "100%" },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$PositiveNumberPer$PositiveNumber,
        ([, numerator, denominator]) =>
          parseFraction(numerator, denominator).map(percentize).match(
            matcher("left"),
          ),
      ],
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("left")),
      ],
      [reBracket_$, ([, attr]) => ({ left: attr })],
    ]),
};

export const m: CSSMap = {
  0: { margin: "0px" },
  auto: { margin: "auto" },
  px: { margin: "1px" },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("margin")),
      ],
      [reBracket_$, ([, arbitrary]) => ({ margin: arbitrary })],
    ]),
};

export const mb: CSSMap = {
  0: { marginBottom: "0px" },
  auto: { marginBottom: "auto" },
  px: { marginBottom: "1px" },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("margin-bottom")),
      ],
      [
        reBracket_$,
        ([, arbitrary]) => ({ marginBottom: arbitrary }),
      ],
    ]),
};

export const mix: CSSMap = {
  blend: {
    normal: { mixBlendMode: "normal" },
    multiply: { mixBlendMode: "multiply" },
    screen: { mixBlendMode: "screen" },
    overlay: { mixBlendMode: "overlay" },
    darken: { mixBlendMode: "darken" },
    lighten: { mixBlendMode: "lighten" },
    hue: { mixBlendMode: "hue" },
    saturation: { mixBlendMode: "saturation" },
    luminosity: { mixBlendMode: "luminosity" },
    difference: { mixBlendMode: "difference" },
    exclusion: { mixBlendMode: "exclusion" },
    color: {
      "": { mixBlendMode: "color" },
      dodge: { mixBlendMode: "color-dodge" },
      burn: { mixBlendMode: "color-burn" },
    },
    hard: {
      light: { mixBlendMode: "hard-light" },
    },
    soft: {
      light: { mixBlendMode: "soft-light" },
    },
  },
};

export const ml: CSSMap = {
  0: { marginLeft: "0px" },
  auto: { marginLeft: "auto" },
  px: { marginLeft: "1px" },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("margin-left")),
      ],
      [
        reBracket_$,
        ([, arbitrary]) => ({ marginLeft: arbitrary }),
      ],
    ]),
};

export const mr: CSSMap = {
  0: { marginRight: "0px" },
  auto: { marginRight: "auto" },
  px: { marginRight: "1px" },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("margin-right")),
      ],
      [
        reBracket_$,
        ([, arbitrary]) => ({ marginRight: arbitrary }),
      ],
    ]),
};

export const mt: CSSMap = {
  0: { marginTop: "0px" },
  auto: { marginTop: "auto" },
  px: { marginTop: "1px" },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("margin-top")),
      ],
      [
        reBracket_$,
        ([, arbitrary]) => ({ marginTop: arbitrary }),
      ],
    ]),
};

export const mx: CSSMap = {
  0: { marginLeft: "0px", marginRight: "0px" },
  auto: { marginLeft: "auto", marginRight: "auto" },
  px: { marginLeft: "1px", marginRight: "1px" },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(
            matcher(["margin-left", "margin-right"]),
          ),
      ],
      [
        reBracket_$,
        ([, arbitrary]) =>
          associateWith(["margin-left", "margin-right"], () => arbitrary),
      ],
    ]),
};

export const my: CSSMap = {
  0: { marginTop: "0px", marginBottom: "0px" },
  auto: { marginTop: "auto", marginBottom: "auto" },
  px: { marginTop: "1px", marginBottom: "1px" },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(
            matcher(["margin-top", "margin-bottom"]),
          ),
      ],
      [
        reBracket_$,
        ([, arbitrary]) =>
          associateWith(["margin-top", "margin-bottom"], () => arbitrary),
      ],
    ]),
};

export const opacity: CSSMap = {
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$PositiveNumber,
        ([, pNumber]) =>
          parseNumeric(pNumber).andThen(per(100)).map(shortDecimal).match(
            matcher("opacity"),
          ),
      ],
    ]),
};

export const order: CSSMap = {
  first: { order: -9999 },
  last: { order: 9999 },
  none: { order: 0 },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$PositiveNumber,
        ([, pNumber]) => parseNumeric(pNumber).match(matcher("order")),
      ],
      [reBracket_$, ([, order]) => ({ order })],
    ]),
};

export const p: CSSMap = {
  0: { padding: "0px" },
  auto: { padding: "auto" },
  px: { padding: "1px" },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("padding")),
      ],
      [reBracket_$, ([, arbitrary]) => ({ padding: arbitrary })],
    ]),
};

export const pb: CSSMap = {
  0: { paddingBottom: "0px" },
  auto: { paddingBottom: "auto" },
  px: { paddingBottom: "1px" },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(
            matcher("padding-bottom"),
          ),
      ],
      [
        reBracket_$,
        ([, arbitrary]) => ({ paddingBottom: arbitrary }),
      ],
    ]),
};

export const pl: CSSMap = {
  0: { paddingLeft: "0px" },
  auto: { paddingLeft: "auto" },
  px: { paddingLeft: "1px" },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("padding-left")),
      ],
      [
        reBracket_$,
        ([, arbitrary]) => ({ paddingLeft: arbitrary }),
      ],
    ]),
};

export const pr: CSSMap = {
  0: { paddingRight: "0px" },
  auto: { paddingRight: "auto" },
  px: { paddingRight: "1px" },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("padding-right")),
      ],
      [
        reBracket_$,
        ([, arbitrary]) => ({ paddingRight: arbitrary }),
      ],
    ]),
};

export const pt: CSSMap = {
  0: { paddingTop: "0px" },
  auto: { paddingTop: "auto" },
  px: { paddingTop: "1px" },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("padding-top")),
      ],
      [
        reBracket_$,
        ([, arbitrary]) => ({ paddingTop: arbitrary }),
      ],
    ]),
};

export const px: CSSMap = {
  0: { paddingLeft: "0px", paddingRight: "0px" },
  auto: { paddingLeft: "auto", paddingRight: "auto" },
  px: { paddingLeft: "1px", paddingRight: "1px" },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(
            matcher(["padding-left", "padding-right"]),
          ),
      ],
      [
        reBracket_$,
        ([, arbitrary]) =>
          associateWith(["padding-left", "padding-right"], () => arbitrary),
      ],
    ]),
};

export const py: CSSMap = {
  0: { paddingTop: "0px", paddingBottom: "0px" },
  auto: { paddingTop: "auto", paddingBottom: "auto" },
  px: { paddingTop: "1px", paddingBottom: "1px" },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(
            matcher(["padding-top", "padding-bottom"]),
          ),
      ],
      [
        reBracket_$,
        ([, arbitrary]) =>
          associateWith(["padding-top", "padding-bottom"], () => arbitrary),
      ],
    ]),
};

export const right: CSSMap = {
  0: { right: "0px" },
  px: { right: "1px" },
  auto: { right: "auto" },
  full: { right: "100%" },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$PositiveNumberPer$PositiveNumber,
        ([, numerator, denominator]) =>
          parseFraction(numerator, denominator).map(percentize).match(
            matcher(["right"]),
          ),
      ],
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("right")),
      ],
      [
        reBracket_$,
        ([, attr]) => ({ right: attr }),
      ],
    ]),
};

export const shrink: CSSMap = {
  "": { flexShrink: 1 },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$PositiveNumber,
        ([, pNumber]) => parseNumeric(pNumber).match(matcher("flex-shrink")),
      ],
      [reBracket_$, ([, arbitrary]) => ({ flexShrink: arbitrary })],
    ]),
};

export const top: CSSMap = {
  0: { top: "0px" },
  px: { top: "1px" },
  auto: { top: "auto" },
  full: { top: "100%" },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$PositiveNumberPer$PositiveNumber,
        ([, numerator, denominator]) =>
          parseFraction(numerator, denominator).map(percentize).match(
            matcher(["top"]),
          ),
      ],
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("top")),
      ],
      [reBracket_$, ([, attr]) => ({ top: attr })],
    ]),
};

const LETTER_SPACING = "letterSpacing";

export const tracking: CSSMap = {
  tighter: { [LETTER_SPACING]: "-0.05em" },
  tight: { [LETTER_SPACING]: "-0.025em" },
  normal: { [LETTER_SPACING]: "0em" },
  wide: { [LETTER_SPACING]: "0.025em" },
  wider: { [LETTER_SPACING]: "0.05em" },
  widest: { [LETTER_SPACING]: "0.1em" },
  "*": ({ id }) =>
    execMatch(id, [
      [reBracket_$, ([, attr]) => ({ [LETTER_SPACING]: attr })],
    ]),
};

export const w: CSSMap = {
  0: { width: "0px" },
  px: { width: "1px" },
  full: { width: "100%" },
  auto: { width: "auto" },
  screen: { width: "100vw" },
  min: { width: "min-content" },
  max: { width: "max-content" },
  fit: { width: "fit-content" },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$Numeric,
        ([, numeric]) =>
          parseNumeric(numeric).andThen(remify).match(matcher("width")),
      ],
      [
        re$PositiveNumberPer$PositiveNumber,
        ([, numerator, denominator]) =>
          parseFraction(numerator, denominator).map(percentize).match(
            matcher(["width"]),
          ),
      ],
      [reBracket_$, ([, arbitrary]) => ({ width: arbitrary })],
    ]),
};

const WHITE_SPACE = "whiteSpace";

export const whitespace: CSSMap = {
  normal: { [WHITE_SPACE]: "normal" },
  nowrap: { [WHITE_SPACE]: "nowrap" },
  pre: {
    "": { [WHITE_SPACE]: "pre" },
    line: { [WHITE_SPACE]: "pre-line" },
    wrap: { [WHITE_SPACE]: "pre-wrap" },
  },
};
export const z: CSSMap = {
  auto: { zIndex: "auto" },
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$PositiveNumber,
        ([, positiveNumber]) =>
          parseNumeric(positiveNumber).match(matcher("z-index")),
      ],
      [reBracket_$, ([, arbitrary]) => ({ zIndex: arbitrary })],
    ]),
};
export const $static: DeclBlock = { position: "static" };
export const fixed: DeclBlock = { position: "fixed" };
export const absolute: DeclBlock = { position: "absolute" };
export const relative: DeclBlock = { position: "relative" };
export const sticky: DeclBlock = { position: "sticky" };
export const visible: DeclBlock = { visibility: "visible" };
export const invisible: DeclBlock = { visibility: "hidden" };
export const antialiased: DeclBlock = {
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
};
export const subpixel: CSSMap = {
  antialiased: {
    WebkitFontSmoothing: "auto",
    MozOsxFontSmoothing: "auto",
  },
};
export const italic: DeclBlock = { fontStyle: "italic" };
export const contents: DeclBlock = { display: "contents" };
export const hidden: DeclBlock = { display: "none" };
export const overline: DeclBlock = { textDecorationLine: "overline" };
export const line: CSSMap = {
  through: { textDecorationLine: "line-through" },
};
export const no: CSSMap = {
  underline: { textDecorationLine: "none" },
};
export const sr: CSSMap = {
  only: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  },
};
export const ordinal: DeclBlock = { fontVariantNumeric: "ordinal" };
export const slashed: CSSMap = {
  zero: { fontVariantNumeric: "slashed-zero" },
};
export const lining: CSSMap = {
  nums: { fontVariantNumeric: "lining-nums" },
};
export const oldstyle: CSSMap = {
  nums: { fontVariantNumeric: "oldstyle-nums" },
};
export const proportional: CSSMap = {
  nums: { fontVariantNumeric: "proportional-nums" },
};
export const tabular: CSSMap = {
  nums: { fontVariantNumeric: "tabular-nums" },
};
export const diagonal: CSSMap = {
  fractions: { fontVariantNumeric: "diagonal-fractions" },
};
export const stacked: CSSMap = {
  fractions: { fontVariantNumeric: "stacked-fractions" },
};
export const uppercase: DeclBlock = { textTransform: "uppercase" };
export const lowercase: DeclBlock = { textTransform: "lowercase" };
export const capitalize: DeclBlock = { textTransform: "capitalize" };
export const truncate: DeclBlock = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const brightness: CSSMap = {
  "*": ({ id }, { variablePrefix }) =>
    execMatch(id, [
      [
        re$PositiveNumber,
        ([, pNumber]) =>
          parseNumeric(pNumber).map(ratio).map(shortDecimal).match({
            some: (value) =>
              handleSingleFilter("brightness", value, variablePrefix),
            none: undefined,
          }),
      ],
    ]),
};

export const contrast: CSSMap = {
  "*": ({ id }, { variablePrefix }) =>
    execMatch(id, [
      [
        re$PositiveNumber,
        ([, pNumber]) => handleFilter("contrast", pNumber, variablePrefix),
      ],
    ]),
};

function handleDrop(value: string, varPrefix: string): DeclBlock {
  return {
    [customProperty("drop-shadow", varPrefix)]: value,
    filter: filterValue(varPrefix),
  };
}

export const drop: CSSMap = {
  shadow: {
    "": (_, { variablePrefix }) =>
      handleDrop(
        "drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))",
        variablePrefix,
      ),
    sm: (_, { variablePrefix }) =>
      handleDrop("drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))", variablePrefix),
    md: (_, { variablePrefix }) =>
      handleDrop(
        "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
        variablePrefix,
      ),
    lg: (_, { variablePrefix }) =>
      handleDrop(
        "drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))",
        variablePrefix,
      ),
    xl: (_, { variablePrefix }) =>
      handleDrop(
        "drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))",
        variablePrefix,
      ),
    "2xl": (_, { variablePrefix }) =>
      handleDrop(
        "drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))",
        variablePrefix,
      ),
    none: (_, { variablePrefix }) =>
      handleDrop(
        "drop-shadow(0 0 #0000)",
        variablePrefix,
      ),
  },
};
export const flow: CSSMap = {
  root: { display: "flow-root" },
};

export const grayscale: CSSMap = {
  "": (_, { variablePrefix }) =>
    handleSingleFilter("grayscale", "100%", variablePrefix),
  0: (_, { variablePrefix }) =>
    handleSingleFilter("grayscale", 0, variablePrefix),
};

function handleSingleFilter(
  propertyName: string,
  value: string | number,
  varPrefix: string,
): DeclBlock {
  return {
    [customProperty(propertyName, varPrefix)]: `${propertyName}(${value})`,
    filter: filterValue(varPrefix),
  };
}

export const hue: CSSMap = {
  rotate: {
    "*": ({ id }, { variablePrefix }) =>
      execMatch(id, [
        [
          re$PositiveNumber,
          ([, pNumber]) =>
            parseNumeric(pNumber).map(unit("deg")).match({
              some: (deg) =>
                handleSingleFilter("hue-rotate", deg, variablePrefix),
              none: undefined,
            }),
        ],
      ]),
  },
};

export const invert: CSSMap = {
  "": (_, { variablePrefix }) =>
    handleSingleFilter("invert", "100%", variablePrefix),
  0: (_, { variablePrefix }) => handleSingleFilter("invert", 0, variablePrefix),
};

export const saturate: CSSMap = {
  "*": ({ id }, { variablePrefix }) =>
    execMatch(id, [
      [
        re$PositiveNumber,
        ([, pNumber]) =>
          parseNumeric(pNumber).map(ratio).map(shortDecimal).match({
            some: (saturate) =>
              handleSingleFilter("saturate", saturate, variablePrefix),
            none: undefined,
          }),
      ],
    ]),
};

export const sepia: CSSMap = {
  "": (_, { variablePrefix }) =>
    handleSingleFilter("sepia", "100%", variablePrefix),
  0: (_, { variablePrefix }) => handleSingleFilter("sepia", 0, variablePrefix),
};

export const duration: CSSMap = {
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$PositiveNumber,
        ([, pNumber]) =>
          parseNumeric(pNumber).map(unit("ms")).match({
            some: (ms) => ({ transitionDuration: ms }),
            none: undefined,
          }),
      ],
    ]),
};

export const ease: CSSMap = {
  linear: { transitionTimingFunction: "linear" },
  in: {
    "": { transitionTimingFunction: "cubic-bezier(0.4, 0, 1, 1)" },
    out: { transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" },
  },
  out: { transitionTimingFunction: "cubic-bezier(0, 0, 0.2, 1)" },
};

export const delay: CSSMap = {
  "*": ({ id }) =>
    execMatch(id, [
      [
        re$PositiveNumber,
        ([, pNumber]) =>
          parseNumeric(pNumber).map(unit("ms")).match({
            some: (ms) => ({ transitionDelay: ms }),
            none: undefined,
          }),
      ],
    ]),
};

export const rotate: CSSMap = {
  "*": ({ id }, { variablePrefix }) =>
    execMatch(id, [
      [
        re$PositiveNumber,
        ([, pNumber]) =>
          parseNumeric(pNumber).map(unit("deg")).match({
            some: (deg) => ({
              [customProperty("rotate", variablePrefix)]: deg,
              transform: transformValue(variablePrefix),
            }),
            none: undefined,
          }),
      ],
    ]),
};

export const skew: CSSMap = {
  x: {
    "*": ({ id }, { variablePrefix }) =>
      execMatch(id, [
        [
          re$PositiveNumber,
          ([, pNumber]) =>
            parseNumeric(pNumber).map(unit("deg")).match({
              some: (deg) => handleTransform(["skew-x"], deg, variablePrefix),
              none: undefined,
            }),
        ],
      ]),
  },
  y: {
    "*": ({ id }, { variablePrefix }) =>
      execMatch(id, [
        [
          re$PositiveNumber,
          ([, pNumber]) =>
            parseNumeric(pNumber).map(unit("deg")).match({
              some: (deg) => handleTransform(["skew-y"], deg, variablePrefix),
              none: undefined,
            }),
        ],
      ]),
  },
};

export const origin: CSSMap = {
  center: { transformOrigin: "center" },
  left: { transformOrigin: "left" },
  right: { transformOrigin: "right" },
  top: {
    "": { transformOrigin: "top" },
    right: { transformOrigin: "top right" },
    left: { transformOrigin: "top left" },
  },
  bottom: {
    "": { transformOrigin: "bottom" },
    right: { transformOrigin: "bottom right" },
    left: { transformOrigin: "bottom left" },
  },
};

function toAccentColor(color: string): { accentColor: string } {
  return { accentColor: color };
}

export const accent: CSSMap = {
  auto: { accentColor: "auto" },
  "*": ({ id }, context) =>
    execMatch(id, [
      [re$AllPer$PositiveNumber, ([, body, numeric]) => {
        const color = resolveTheme(body, "color", context);
        if (isUndefined(color)) return;

        return parseNumeric(numeric).match({
          some: (number) =>
            parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn)
              .match({
                some: toAccentColor,
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
            some: toAccentColor,
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
              some: toAccentColor,
              none: () => toAccentColor(color),
            });
        },
      ],
    ]),
};

export const appearance: CSSMap = {
  none: { appearance: "none" },
};
export const cursor: CSSMap = {
  auto: { cursor: "auto" },
  default: { cursor: "default" },
  pointer: { cursor: "pointer" },
  wait: { cursor: "wait" },
  text: { cursor: "text" },
  move: { cursor: "move" },
  help: { cursor: "help" },
  none: { cursor: "none" },
  progress: { cursor: "progress" },
  cell: { cursor: "cell" },
  crosshair: { cursor: "crosshair" },
  vertical: {
    text: { cursor: "vertical-text" },
  },
  alias: { cursor: "alias" },
  copy: { cursor: "copy" },
  no: {
    drop: { cursor: "no-drop" },
  },
  context: {
    menu: { cursor: "context-menu" },
  },
  grab: { cursor: "grab" },
  grabbing: { cursor: "grabbing" },
  all: {
    scroll: { cursor: "all-scroll" },
  },
  col: {
    resize: { cursor: "col-resize" },
  },
  row: {
    resize: { cursor: "row-resize" },
  },
  n: {
    resize: { cursor: "n-resize" },
  },
  e: {
    resize: { cursor: "e-resize" },
  },
  s: {
    resize: { cursor: "s-resize" },
  },
  w: {
    resize: { cursor: "w-resize" },
  },
  ne: {
    resize: { cursor: "ne-resize" },
  },
  nw: {
    resize: { cursor: "nw-resize" },
  },
  se: {
    resize: { cursor: "se-resize" },
  },
  sw: {
    resize: { cursor: "sw-resize" },
  },
  ew: {
    resize: { cursor: "ew-resize" },
  },
  ns: {
    resize: { cursor: "ns-resize" },
  },
  nesw: {
    resize: { cursor: "nesw-resize" },
  },
  nwse: {
    resize: { cursor: "nwse-resize" },
  },
  zoom: {
    in: { cursor: "zoom-in" },
    out: { cursor: "zoom-out" },
  },
  not: {
    allowed: { cursor: "not-allowed" },
  },
};
function toCaretColor(color: string) {
  return { caretColor: color };
}

export const caret: CSSMap = {
  "*": ({ id }, context) =>
    execMatch(id, [
      [re$AllPer$PositiveNumber, ([, body, numeric]) => {
        const color = resolveTheme(body, "color", context);
        if (isUndefined(color)) return;

        return parseNumeric(numeric).match({
          some: (number) =>
            parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn)
              .match({
                some: toCaretColor,
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
            some: toCaretColor,
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
              some: toCaretColor,
              none: () => toCaretColor(color),
            });
        },
      ],
    ]),
};
export const pointer: CSSMap = {
  events: {
    none: { pointerEvents: "none" },
    auto: { pointerEvents: "auto" },
  },
};
export const resize: CSSMap = {
  "": { resize: "both" },
  none: { resize: "none" },
  x: { resize: "horizontal" },
  y: { resize: "vertical" },
};
export const touch: CSSMap = {
  auto: { touchAction: "auto" },
  none: { touchAction: "none" },
  manipulation: { touchAction: "manipulation" },
  pan: {
    x: { touchAction: "pan-x" },
    y: { touchAction: "pan-y" },
    left: { touchAction: "pan-left" },
    right: { touchAction: "pan-right" },
    up: { touchAction: "pan-up" },
    down: { touchAction: "pan-down" },
  },
  pinch: {
    zoom: { touchAction: "pinch-zoom" },
  },
};

export const select: CSSMap = {
  none: { userSelect: "none" },
  text: { userSelect: "text" },
  all: { userSelect: "all" },
  auto: { userSelect: "auto" },
};
export const will: CSSMap = {
  change: {
    auto: { willChange: "auto" },
    scroll: { willChange: "scroll-position" },
    contents: { willChange: "contents" },
    transform: { willChange: "transform" },
  },
};
function toFill(color: string) {
  return { fill: color };
}

export const fill: CSSMap = {
  "*": ({ id }, context) =>
    execMatch(id, [
      [re$AllPer$PositiveNumber, ([, body, numeric]) => {
        const color = resolveTheme(body, "color", context);
        if (isUndefined(color)) return;

        return parseNumeric(numeric).match({
          some: (number) =>
            parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn)
              .match({
                some: toFill,
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
            some: toFill,
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
              some: toFill,
              none: () => toFill(color),
            });
        },
      ],
    ]),
};

function varGradient(varPrefix: string) {
  const [varGradientFrom, varFnGradientFrom] = customPropertySet(
    "gradient-from",
    varPrefix,
  );
  const [varGradientStops] = customPropertySet(
    "gradient-stops",
    varPrefix,
  );
  const [varGradientTo] = customPropertySet(
    "gradient-to",
    varPrefix,
  );
  return {
    varGradientFrom,
    varFnGradientFrom,
    varGradientStops,
    varGradientTo,
  };
}
function defaultGradientColor(isRGB: boolean, color: string): string {
  // transparent is special as default color
  return isRGB
    ? color
    : color === "transparent"
    ? "rgb(0 0 0/0)"
    : "rgb(255 255 255/0)";
}

export const from: CSSMap = {
  "*": ({ id }, context) => {
    const color = resolveTheme(id, "color", context);
    if (isUndefined(color)) return;

    const _color = parseColor(color).map(completionRGBA(1, true))
      .map(rgbFn)
      .match({
        some: (color) => [true, color] as [boolean, string],
        none: [false, color] as [boolean, string],
      });

    const defaultColor = defaultGradientColor(_color[0], _color[1]);

    const {
      varFnGradientFrom,
      varGradientFrom,
      varGradientStops,
      varGradientTo,
    } = varGradient(context.variablePrefix);

    return {
      [varGradientFrom]: _color[1],
      [varGradientStops]:
        `${varFnGradientFrom}, var(${varGradientTo}, ${defaultColor})`,
    };
  },
};

export const via: CSSMap = {
  "*": ({ id }, context) => {
    const color = resolveTheme(id, "color", context);
    if (isUndefined(color)) return;

    const _color = parseColor(color).map(completionRGBA(1, true))
      .map(rgbFn)
      .match({
        some: (color) => [true, color] as [boolean, string],
        none: [false, color] as [boolean, string],
      });

    const defaultColor = defaultGradientColor(_color[0], _color[1]);

    const {
      varFnGradientFrom,
      varGradientStops,
      varGradientTo,
    } = varGradient(context.variablePrefix);

    return {
      [varGradientStops]: `${varFnGradientFrom}, ${
        _color[1]
      }, var(${varGradientTo}, ${defaultColor})`,
    };
  },
};

export const to: CSSMap = {
  "*": ({ id }, context) => {
    const color = resolveTheme(id, "color", context);
    if (isUndefined(color)) return;

    const _color = parseColor(color).map(completionRGBA(1, true))
      .map(rgbFn)
      .match({
        some: (color) => color,
        none: color,
      });
    const { varGradientTo } = varGradient(context.variablePrefix);
    return {
      [varGradientTo]: _color,
    };
  },
};
