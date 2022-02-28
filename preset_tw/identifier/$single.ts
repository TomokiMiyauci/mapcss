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
import type {
  BlockDefinition,
  EntriesIdentifier,
  Identifier,
  RecordIdentifier,
} from "../../core/types.ts";
import {
  customPropertySet,
  handleTransform,
  matcher,
  percentize,
  remify,
  transformValue,
} from "./_utils.ts";
import { resolveTheme } from "../../core/resolve.ts";
import { associateWith, isUndefined } from "../../deps.ts";
import {
  re$All,
  re$AllPer$PositiveNumber,
  re$AllPerBracket_$,
  re$Numeric,
  re$PositiveNumber,
  re$PositiveNumberPer$PositiveNumber,
  reBracket_$,
} from "../../core/utils/regexp.ts";
import { AUTO } from "../../constants.ts";

const VERTICAL_ALIGN = "vertical-align";

export const align: EntriesIdentifier = [
  ["baseline", { [VERTICAL_ALIGN]: "baseline" }],
  ["top", { [VERTICAL_ALIGN]: "top" }],
  ["middle", { [VERTICAL_ALIGN]: "middle" }],
  ["bottom", { [VERTICAL_ALIGN]: "bottom" }],
  ["text", {
    top: { [VERTICAL_ALIGN]: "text-top" },
    bottom: { [VERTICAL_ALIGN]: "text-bottom" },
  }],
  ["sub", { [VERTICAL_ALIGN]: "sub" }],
  ["super", { [VERTICAL_ALIGN]: "super" }],
];
const ASPECT_RATIO = "aspect-ratio";
export const aspect: EntriesIdentifier = [
  ["auto", { [ASPECT_RATIO]: AUTO }],
  ["square", { [ASPECT_RATIO]: "1/1" }],
  ["video", { [ASPECT_RATIO]: "16/9" }],
  [reBracket_$, ([, arbitrary]) => ({ [ASPECT_RATIO]: arbitrary })],
];
export const basis: EntriesIdentifier = [
  [0, { "flex-basis": "0px" }],
  ["px", { "flex-basis": "1px" }],
  ["auto", { "flex-basis": "auto" }],
  ["full", {
    "flex-basis": "100%",
  }],
  [
    re$Numeric,
    ([, numeric]) =>
      parseNumeric(numeric).andThen(remify).match(matcher("flex-basis")),
  ],
  [
    re$AllPer$PositiveNumber,
    ([, numerator, denominator]) =>
      parseFraction(numerator, denominator).map(percentize).match(
        matcher(["flex-basis"]),
      ),
  ],
  [reBracket_$, ([, arbitrary]) => ({ "flex-basis": arbitrary })],
];
export const block: BlockDefinition = { display: "block" };
export const bottom: EntriesIdentifier = [
  [0, { bottom: "0px" }],
  ["px", { bottom: "1px" }],
  ["auto", { bottom: "auto" }],
  ["full", { bottom: "100%" }],
  ["f", { "$css": { "ff": "ff" } }],
  [
    re$PositiveNumberPer$PositiveNumber,
    ([, numerator, denominator]) =>
      parseFraction(numerator, denominator).map(percentize).match(
        matcher(["bottom"]),
      ),
  ],
  [
    re$Numeric,
    ([, numeric]) =>
      parseNumeric(numeric).andThen(remify).match(matcher(["bottom"])),
  ],
  [
    reBracket_$,
    ([, attr]) => ({ bottom: attr }),
  ],
];

export const container: EntriesIdentifier = [
  ["DEFAULT", (_, context) => {
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
  }],
];
export const clear: RecordIdentifier = {
  right: { clear: "right" },
  left: { clear: "left" },
  both: { clear: "both" },
  none: { clear: "none" },
};
export const columns: EntriesIdentifier = [
  ["auto", { columns: "auto" }],
  ["3xs", { columns: "16rem" }],
  ["2xs", { columns: "18rem" }],
  ["xs", { columns: "20rem" }],
  ["sm", { columns: "24rem" }],
  ["md", { columns: "28rem" }],
  ["lg", { columns: "32rem" }],
  ["xl", { columns: "36rem" }],
  ["2xl", { columns: "42rem" }],
  ["3xl", { columns: "48rem" }],
  ["4xl", { columns: "56rem" }],
  ["5xl", { columns: "64rem" }],
  ["6xl", { columns: "72rem" }],
  ["7xl", { columns: "80rem" }],
  [re$PositiveNumber, ([, n]) => parseNumeric(n).match(matcher("columns"))],
  [reBracket_$, ([, arbitrary]) => ({ "columns": arbitrary })],
];
export const float: Identifier = {
  right: { float: "right" },
  left: { float: "left" },
  none: { float: "none" },
};
export const grow: EntriesIdentifier = [
  ["DEFAULT", { "flex-grow": 1 }],
  [
    re$PositiveNumber,
    ([, pNumber]) => parseNumeric(pNumber).match(matcher("flex-grow")),
  ],
  [reBracket_$, ([, arbitrary]) => ({ "flex-grow": arbitrary })],
];
export const h: Identifier = [
  [0, { height: "0px" }],
  ["px", { height: "1px" }],
  ["auto", { height: "auto" }],
  ["full", { height: "100%" }],
  ["screen", { height: "100vh" }],
  ["min", { height: "min-content" }],
  ["max", { height: "max-content" }],
  ["fit", { height: "fit-content" }],
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
];
export const indent: EntriesIdentifier = [
  [0, { "text-indent": "0px" }],
  ["px", { "text-indent": "1px" }],
  [
    re$Numeric,
    ([, numeric]) =>
      parseNumeric(numeric).andThen(remify).match(matcher("text-indent")),
  ],
  [reBracket_$, ([, attr]) => ({ "text-indent": attr })],
];
export const inline: Identifier = {
  DEFAULT: { display: "inline" },
  block: { display: "inline-block" },
  flex: { display: "inline-flex" },
  table: { display: "inline-table" },
  grid: { display: "inline-grid" },
};
export const isolate: BlockDefinition = { isolation: "isolate" };
export const isolation: Identifier = {
  auto: {
    isolation: "auto",
  },
};
export const items: Identifier = {
  center: { "align-items": "center" },
  start: { "align-items": "flex-start" },
  end: { "align-items": "flex-end" },
  baseline: { "align-items": "baseline" },
  stretch: { "align-items": "stretch" },
};
export const leading: Identifier = [
  ["none", { "line-height": 1 }],
  ["tight", { "line-height": 1.25 }],
  ["snug", { "line-height": 1.375 }],
  ["normal", { "line-height": 1.5 }],
  ["relaxed", { "line-height": 1.625 }],
  ["loose", { "line-height": 2 }],
  [
    re$PositiveNumber,
    ([, number]) =>
      parseNumeric(number).andThen(remify).match(matcher("line-height")),
  ],
  [reBracket_$, ([, attr]) => ({ "line-height": attr })],
];
export const left: EntriesIdentifier = [
  [0, { left: "0px" }],
  ["px", { left: "1px" }],
  ["auto", { left: "auto" }],
  ["full", { left: "100%" }],

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
];
export const m: Identifier = [
  ["0", { margin: "0px" }],
  ["auto", { margin: "auto" }],
  ["px", { margin: "1px" }],
  [
    re$Numeric,
    ([, numeric]) =>
      parseNumeric(numeric).andThen(remify).match(matcher("margin")),
  ],
  [reBracket_$, ([, arbitrary]) => ({ margin: arbitrary })],
];
export const mb: Identifier = [
  ["0", { "margin-bottom": "0px" }],
  ["auto", { "margin-bottom": "auto" }],
  ["px", { "margin-bottom": "1px" }],
  [
    re$Numeric,
    ([, numeric]) =>
      parseNumeric(numeric).andThen(remify).match(matcher("margin-bottom")),
  ],
  [
    reBracket_$,
    ([, arbitrary]) => ({ "margin-bottom": arbitrary }),
  ],
];
export const mix: EntriesIdentifier = [
  ["blend", {
    normal: { "mix-blend-mode": "normal" },
    multiply: { "mix-blend-mode": "multiply" },
    screen: { "mix-blend-mode": "screen" },
    overlay: { "mix-blend-mode": "overlay" },
    darken: { "mix-blend-mode": "darken" },
    lighten: { "mix-blend-mode": "lighten" },
    hue: { "mix-blend-mode": "hue" },
    saturation: { "mix-blend-mode": "saturation" },
    luminosity: { "mix-blend-mode": "luminosity" },
    difference: { "mix-blend-mode": "difference" },
    exclusion: { "mix-blend-mode": "exclusion" },
    color: {
      DEFAULT: { "mix-blend-mode": "color" },
      dodge: { "mix-blend-mode": "color-dodge" },
      burn: { "mix-blend-mode": "color-burn" },
    },
    hard: {
      light: { "mix-blend-mode": "hard-light" },
    },
    soft: {
      light: { "mix-blend-mode": "soft-light" },
    },
  }],
];
export const ml: Identifier = [
  ["0", { "margin-left": "0px" }],
  ["auto", { "margin-left": "auto" }],
  ["px", { "margin-left": "1px" }],
  [
    re$Numeric,
    ([, numeric]) =>
      parseNumeric(numeric).andThen(remify).match(matcher("margin-left")),
  ],
  [
    reBracket_$,
    ([, arbitrary]) => ({ "margin-left": arbitrary }),
  ],
];
export const mr: Identifier = [
  ["0", { "margin-right": "0px" }],
  ["auto", { "margin-right": "auto" }],
  ["px", { "margin-right": "1px" }],
  [
    re$Numeric,
    ([, numeric]) =>
      parseNumeric(numeric).andThen(remify).match(matcher("margin-right")),
  ],
  [
    reBracket_$,
    ([, arbitrary]) => ({ "margin-right": arbitrary }),
  ],
];
export const mt: Identifier = [
  ["0", { "margin-top": "0px" }],
  ["auto", { "margin-top": "auto" }],
  ["px", { "margin-top": "1px" }],
  [
    re$Numeric,
    ([, numeric]) =>
      parseNumeric(numeric).andThen(remify).match(matcher("margin-top")),
  ],
  [
    reBracket_$,
    ([, arbitrary]) => ({ "margin-top": arbitrary }),
  ],
];
export const mx: Identifier = [
  ["0", { "margin-left": "0px", "margin-right": "0px" }],
  ["auto", { "margin-left": "auto", "margin-right": "auto" }],
  ["px", { "margin-left": "1px", "margin-right": "1px" }],
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
];
export const my: Identifier = [
  ["0", { "margin-top": "0px", "margin-bottom": "0px" }],
  ["auto", { "margin-top": "auto", "margin-bottom": "auto" }],
  ["px", { "margin-top": "1px", "margin-bottom": "1px" }],
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
];
export const opacity: EntriesIdentifier = [
  [
    re$PositiveNumber,
    ([, pNumber]) =>
      parseNumeric(pNumber).andThen(per(100)).map(shortDecimal).match(
        matcher("opacity"),
      ),
  ],
];
export const order: EntriesIdentifier = [
  ["first", { order: -9999 }],
  ["last", { order: 9999 }],
  ["none", { order: 0 }],
  [
    re$PositiveNumber,
    ([, pNumber]) => parseNumeric(pNumber).match(matcher("order")),
  ],
  [reBracket_$, ([, order]) => ({ order })],
];
export const p: Identifier = [
  ["0", { padding: "0px" }],
  ["auto", { padding: "auto" }],
  ["px", { padding: "1px" }],
  [
    re$Numeric,
    ([, numeric]) =>
      parseNumeric(numeric).andThen(remify).match(matcher("padding")),
  ],
  [reBracket_$, ([, arbitrary]) => ({ padding: arbitrary })],
];
export const pb: Identifier = [
  ["0", { "padding-bottom": "0px" }],
  ["auto", { "padding-bottom": "auto" }],
  ["px", { "padding-bottom": "1px" }],
  [
    re$Numeric,
    ([, numeric]) =>
      parseNumeric(numeric).andThen(remify).match(matcher("padding-bottom")),
  ],
  [
    reBracket_$,
    ([, arbitrary]) => ({ "padding-bottom": arbitrary }),
  ],
];
export const pl: Identifier = [
  ["0", { "padding-left": "0px" }],
  ["auto", { "padding-left": "auto" }],
  ["px", { "padding-left": "1px" }],
  [
    re$Numeric,
    ([, numeric]) =>
      parseNumeric(numeric).andThen(remify).match(matcher("padding-left")),
  ],
  [
    reBracket_$,
    ([, arbitrary]) => ({ "padding-left": arbitrary }),
  ],
];
export const pr: Identifier = [
  ["0", { "padding-right": "0px" }],
  ["auto", { "padding-right": "auto" }],
  ["px", { "padding-right": "1px" }],
  [
    re$Numeric,
    ([, numeric]) =>
      parseNumeric(numeric).andThen(remify).match(matcher("padding-right")),
  ],
  [
    reBracket_$,
    ([, arbitrary]) => ({ "padding-right": arbitrary }),
  ],
];
export const pt: Identifier = [
  ["0", { "padding-top": "0px" }],
  ["auto", { "padding-top": "auto" }],
  ["px", { "padding-top": "1px" }],
  [
    re$Numeric,
    ([, numeric]) =>
      parseNumeric(numeric).andThen(remify).match(matcher("padding-top")),
  ],
  [
    reBracket_$,
    ([, arbitrary]) => ({ "padding-top": arbitrary }),
  ],
];
export const px: Identifier = [
  ["0", { "padding-left": "0px", "padding-right": "0px" }],
  ["auto", { "padding-left": "auto", "padding-right": "auto" }],
  ["px", { "padding-left": "1px", "padding-right": "1px" }],
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
];
export const py: Identifier = [
  ["0", { "padding-top": "0px", "padding-bottom": "0px" }],
  ["auto", { "padding-top": "auto", "padding-bottom": "auto" }],
  ["px", { "padding-top": "1px", "padding-bottom": "1px" }],
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
];

export const right: EntriesIdentifier = [
  [0, { right: "0px" }],
  ["px", { right: "1px" }],
  ["auto", { right: "auto" }],
  ["full", { right: "100%" }],

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
];
export const shrink: EntriesIdentifier = [
  ["DEFAULT", { "flex-shrink": 1 }],
  [
    re$PositiveNumber,
    ([, pNumber]) => parseNumeric(pNumber).match(matcher("flex-shrink")),
  ],
  [reBracket_$, ([, arbitrary]) => ({ "flex-shrink": arbitrary })],
];
export const top: EntriesIdentifier = [
  [0, { top: "0px" }],
  ["px", { top: "1px" }],
  ["auto", { top: "auto" }],
  ["full", { top: "100%" }],

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
  [reBracket_$, ([, attr]) => ({ "top": attr })],
];
const LETTER_SPACING = "letter-spacing";

export const tracking: Identifier = [
  ["tighter", { [LETTER_SPACING]: "-0.05em" }],
  ["tight", { [LETTER_SPACING]: "-0.025em" }],
  ["normal", { [LETTER_SPACING]: "0em" }],
  ["wide", { [LETTER_SPACING]: "0.025em" }],
  ["wider", { [LETTER_SPACING]: "0.05em" }],
  ["widest", { [LETTER_SPACING]: "0.1em" }],
  [reBracket_$, ([, attr]) => ({ [LETTER_SPACING]: attr })],
];
export const w: Identifier = [
  [0, { width: "0px" }],
  ["px", { width: "1px" }],
  ["full", { width: "100%" }],
  ["auto", { width: "auto" }],
  ["screen", { width: "100vw" }],
  ["min", { width: "min-content" }],
  ["max", { width: "max-content" }],
  ["fit", { width: "fit-content" }],
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
];
const WHITE_SPACE = "white-space";

export const whitespace: Identifier = [
  ["normal", { [WHITE_SPACE]: "normal" }],
  ["nowrap", { [WHITE_SPACE]: "nowrap" }],
  ["pre", {
    DEFAULT: { [WHITE_SPACE]: "pre" },
    line: { [WHITE_SPACE]: "pre-line" },
    wrap: { [WHITE_SPACE]: "pre-wrap" },
  }],
];
export const z: Identifier = [
  ["auto", {
    "z-index": "auto",
  }],
  [
    re$PositiveNumber,
    ([, positiveNumber]) =>
      parseNumeric(positiveNumber).match(matcher("z-index")),
  ],
  [reBracket_$, ([, arbitrary]) => ({ "z-index": arbitrary })],
];
export const $static: BlockDefinition = {
  position: "static",
};
export const fixed: BlockDefinition = {
  position: "fixed",
};
export const absolute: BlockDefinition = {
  position: "absolute",
};
export const relative: BlockDefinition = {
  position: "relative",
};
export const sticky: BlockDefinition = {
  position: "sticky",
};
export const visible: BlockDefinition = {
  visibility: "visible",
};
export const invisible: BlockDefinition = {
  visibility: "hidden",
};
export const antialiased: BlockDefinition = {
  "-webkit-font-smoothing": "antialiased",
  "-moz-osx-font-smoothing": "grayscale",
};
export const subpixel: Identifier = {
  antialiased: {
    "-webkit-font-smoothing": "auto",
    "-moz-osx-font-smoothing": "auto",
  },
};
export const italic: BlockDefinition = {
  "font-style": "italic",
};
export const contents: BlockDefinition = {
  display: "contents",
};
export const hidden: BlockDefinition = {
  display: "none",
};
export const overline: BlockDefinition = {
  "text-decoration-line": "overline",
};
export const line: Identifier = {
  through: { "text-decoration-line": "line-through" },
};
export const no: Identifier = {
  underline: { "text-decoration-line": "none" },
};
export const sr: Identifier = {
  only: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    "white-space": "nowrap",
    "border-width": 0,
  },
};
export const ordinal: BlockDefinition = { "font-variant-numeric": "ordinal" };
export const slashed: RecordIdentifier = {
  zero: { "font-variant-numeric": "slashed-zero" },
};
export const lining: RecordIdentifier = {
  nums: { "font-variant-numeric": "lining-nums" },
};
export const oldstyle: RecordIdentifier = {
  nums: { "font-variant-numeric": "oldstyle-nums" },
};
export const proportional: RecordIdentifier = {
  nums: { "font-variant-numeric": "proportional-nums" },
};
export const tabular: RecordIdentifier = {
  nums: { "font-variant-numeric": "tabular-nums" },
};
export const diagonal: RecordIdentifier = {
  fractions: { "font-variant-numeric": "diagonal-fractions" },
};
export const stacked: RecordIdentifier = {
  fractions: { "font-variant-numeric": "stacked-fractions" },
};
export const uppercase: BlockDefinition = { "text-transform": "uppercase" };
export const lowercase: BlockDefinition = { "text-transform": "lowercase" };
export const capitalize: BlockDefinition = { "text-transform": "capitalize" };
export const truncate: BlockDefinition = {
  overflow: "hidden",
  "text-overflow": "ellipsis",
  "white-space": "nowrap",
};
export const brightness: EntriesIdentifier = [
  [
    re$PositiveNumber,
    ([, pNumber], { variablePrefix }) =>
      parseNumeric(pNumber).map(ratio).map(shortDecimal).match({
        some: (value) =>
          handleSingleFilter("brightness", value, variablePrefix),
        none: undefined,
      }),
  ],
];

export const contrast: EntriesIdentifier = [
  [
    re$PositiveNumber,
    ([, pNumber], { variablePrefix }) =>
      handleFilter("contrast", pNumber, variablePrefix),
  ],
];

function handleDrop(value: string, varPrefix: string): BlockDefinition {
  return {
    [customProperty("drop-shadow", varPrefix)]: value,
    filter: filterValue(varPrefix),
  };
}

export const drop: RecordIdentifier = {
  shadow: {
    DEFAULT: (_, { variablePrefix }) =>
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
export const flow: RecordIdentifier = {
  root: { display: "flow-root" },
};

export const grayscale: EntriesIdentifier = [
  [
    "DEFAULT",
    (_, { variablePrefix }) =>
      handleSingleFilter("grayscale", "100%", variablePrefix),
  ],
  [
    0,
    (_, { variablePrefix }) =>
      handleSingleFilter("grayscale", 0, variablePrefix),
  ],
];

function handleSingleFilter(
  propertyName: string,
  value: string | number,
  varPrefix: string,
): BlockDefinition {
  return {
    [customProperty(propertyName, varPrefix)]: `${propertyName}(${value})`,
    filter: filterValue(varPrefix),
  };
}

export const hue: RecordIdentifier = {
  rotate: [
    [
      re$PositiveNumber,
      ([, pNumber], { variablePrefix }) =>
        parseNumeric(pNumber).map(unit("deg")).match({
          some: (deg) => handleSingleFilter("hue-rotate", deg, variablePrefix),
          none: undefined,
        }),
    ],
  ],
};

export const invert: EntriesIdentifier = [
  [
    "DEFAULT",
    (_, { variablePrefix }) =>
      handleSingleFilter("invert", "100%", variablePrefix),
  ],
  [
    0,
    (_, { variablePrefix }) => handleSingleFilter("invert", 0, variablePrefix),
  ],
];

export const saturate: EntriesIdentifier = [
  [
    re$PositiveNumber,
    ([, pNumber], { variablePrefix }) =>
      parseNumeric(pNumber).map(ratio).map(shortDecimal).match({
        some: (saturate) =>
          handleSingleFilter("saturate", saturate, variablePrefix),
        none: undefined,
      }),
  ],
];

export const sepia: EntriesIdentifier = [
  [
    "DEFAULT",
    (_, { variablePrefix }) =>
      handleSingleFilter("sepia", "100%", variablePrefix),
  ],
  [
    0,
    (_, { variablePrefix }) => handleSingleFilter("sepia", 0, variablePrefix),
  ],
];

export const duration: EntriesIdentifier = [
  [
    re$PositiveNumber,
    ([, pNumber]) =>
      parseNumeric(pNumber).map(unit("ms")).match({
        some: (ms) => ({ "transition-duration": ms }),
        none: undefined,
      }),
  ],
];

export const ease: RecordIdentifier = {
  linear: { "transition-timing-function": "linear" },
  in: {
    DEFAULT: { "transition-timing-function": "cubic-bezier(0.4, 0, 1, 1)" },
    out: { "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)" },
  },
  out: { "transition-timing-function": "cubic-bezier(0, 0, 0.2, 1)" },
};

export const delay: EntriesIdentifier = [
  [
    re$PositiveNumber,
    ([, pNumber]) =>
      parseNumeric(pNumber).map(unit("ms")).match({
        some: (ms) => ({ "transition-delay": ms }),
        none: undefined,
      }),
  ],
];

export const rotate: EntriesIdentifier = [
  [
    re$PositiveNumber,
    ([, pNumber], { variablePrefix }) =>
      parseNumeric(pNumber).map(unit("deg")).match({
        some: (deg) => ({
          [customProperty("rotate", variablePrefix)]: deg,
          transform: transformValue(variablePrefix),
        }),
        none: undefined,
      }),
  ],
];

export const skew: RecordIdentifier = {
  x: [
    [
      re$PositiveNumber,
      ([, pNumber], { variablePrefix }) =>
        parseNumeric(pNumber).map(unit("deg")).match({
          some: (deg) => handleTransform(["skew-x"], deg, variablePrefix),
          none: undefined,
        }),
    ],
  ],
  y: [
    [
      re$PositiveNumber,
      ([, pNumber], { variablePrefix }) =>
        parseNumeric(pNumber).map(unit("deg")).match({
          some: (deg) => handleTransform(["skew-y"], deg, variablePrefix),
          none: undefined,
        }),
    ],
  ],
};

export const origin: RecordIdentifier = {
  center: { "transform-origin": "center" },
  left: { "transform-origin": "left" },
  right: { "transform-origin": "right" },
  top: {
    DEFAULT: { "transform-origin": "top" },
    right: { "transform-origin": "top right" },
    left: { "transform-origin": "top left" },
  },
  bottom: {
    DEFAULT: { "transform-origin": "bottom" },
    right: { "transform-origin": "bottom right" },
    left: { "transform-origin": "bottom left" },
  },
};

function toAccentColor(color: string): { "accent-color": string } {
  return { "accent-color": color };
}
export const accent: EntriesIdentifier = [
  ["auto", { "accent-color": "auto" }],
  [re$AllPer$PositiveNumber, ([, body, numeric], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return parseNumeric(numeric).match({
      some: (number) =>
        parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn).match({
          some: toAccentColor,
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
      some: toAccentColor,
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
          some: toAccentColor,
          none: () => toAccentColor(color),
        });
    },
  ],
];
export const appearance: RecordIdentifier = {
  none: { appearance: "none" },
};
export const cursor: RecordIdentifier = {
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
  return { "caret-color": color };
}
export const caret: EntriesIdentifier = [
  [re$AllPer$PositiveNumber, ([, body, numeric], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return parseNumeric(numeric).match({
      some: (number) =>
        parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn).match({
          some: toCaretColor,
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
      some: toCaretColor,
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
          some: toCaretColor,
          none: () => toCaretColor(color),
        });
    },
  ],
];
export const pointer: RecordIdentifier = {
  events: {
    none: { "pointer-events": "none" },
    auto: { "pointer-events": "auto" },
  },
};
export const resize: RecordIdentifier = {
  DEFAULT: { resize: "both" },
  none: { resize: "none" },
  x: { resize: "horizontal" },
  y: { resize: "vertical" },
};
export const touch: RecordIdentifier = {
  auto: { "touch-action": "auto" },
  none: { "touch-action": "none" },
  manipulation: { "touch-action": "manipulation" },
  pan: {
    x: { "touch-action": "pan-x" },
    y: { "touch-action": "pan-y" },
    left: { "touch-action": "pan-left" },
    right: { "touch-action": "pan-right" },
    up: { "touch-action": "pan-up" },
    down: { "touch-action": "pan-down" },
  },
  pinch: {
    zoom: { "touch-action": "pinch-zoom" },
  },
};

export const select: RecordIdentifier = {
  none: { "user-select": "none" },
  text: { "user-select": "text" },
  all: { "user-select": "all" },
  auto: { "user-select": "auto" },
};
export const will: RecordIdentifier = {
  change: {
    auto: { "will-change": "auto" },
    scroll: { "will-change": "scroll-position" },
    contents: { "will-change": "contents" },
    transform: { "will-change": "transform" },
  },
};
function toFill(color: string) {
  return { fill: color };
}
export const fill: EntriesIdentifier = [
  [re$AllPer$PositiveNumber, ([, body, numeric], context) => {
    const color = resolveTheme(body, "color", context);
    if (isUndefined(color)) return;

    return parseNumeric(numeric).match({
      some: (number) =>
        parseColor(color).map(completionRGBA(ratio(number))).map(rgbFn).match({
          some: toFill,
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
      some: toFill,
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
          some: toFill,
          none: () => toFill(color),
        });
    },
  ],
];

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

export const from: EntriesIdentifier = [
  [
    re$All,
    ([body], context) => {
      const color = resolveTheme(body, "color", context);
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
  ],
];
export const via: EntriesIdentifier = [
  [
    re$All,
    ([body], context) => {
      const color = resolveTheme(body, "color", context);
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
  ],
];
export const to: EntriesIdentifier = [
  [
    re$All,
    ([body], context) => {
      const color = resolveTheme(body, "color", context);
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
  ],
];