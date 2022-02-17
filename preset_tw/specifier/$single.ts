import { rePositiveNumber } from "../../core/utils/regexp.ts";
import { filterValue, handleFilter } from "./_filter_utils.ts";
import { parseColor, parseNumeric } from "../../core/utils/monad.ts";
import {
  completionRGBA,
  customProperty,
  ratio,
  rgbFn,
  shortDecimal,
  unit,
} from "../../core/utils/format.ts";
import type {
  CSSObject,
  CSSStatement,
  EntriesSpecifier,
  RecordSpecifier,
  Specifier,
} from "../../core/types.ts";
import {
  associateNumeric,
  associatePer100,
  associatePercent,
  associateRem,
  customPropertySet,
  fractionBy,
  handleTransform,
  numericBy,
  remBy,
  transformValue,
} from "./_utils.ts";
import { resolveTheme } from "../../core/resolve.ts";
import { associateWith, isUndefined } from "../../deps.ts";
import {
  re$SlashBracket$,
  reAll,
  reBracket$,
  reFraction,
  reNumeric,
  reSlashNumber,
} from "../../core/utils/regexp.ts";
import { AUTO, HIDDEN } from "../../constants.ts";
import { minWidthMediaQuery } from "../modifiers/breakpoint.ts";

const VERTICAL_ALIGN = "vertical-align";

export const align: EntriesSpecifier = [
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
export const aspect: Specifier = [
  ["auto", { [ASPECT_RATIO]: AUTO }],
  ["square", { [ASPECT_RATIO]: "1 / 1" }],
  ["video", { [ASPECT_RATIO]: "16 / 9" }],
];
const BACKFACE_VISIBILITY = "backface-visibility";

export const backface: Specifier = {
  visible: { [BACKFACE_VISIBILITY]: "visible" },
  hidden: { [BACKFACE_VISIBILITY]: HIDDEN },
};
export const basis: EntriesSpecifier = [
  [0, { "flex-basis": "0px" }],
  ["px", { "flex-basis": "1px" }],
  ["auto", { "flex-basis": "auto" }],
  ["full", {
    "flex-basis": "100%",
  }],
  [reNumeric, ([, numeric]) => associateRem(["flex-basis"], numeric)],
  [
    reSlashNumber,
    ([, numerator, denominator]) =>
      associatePercent(["flex-basis"], numerator, denominator),
  ],
  [reBracket$, ([, arbitrary]) => ({ "flex-basis": arbitrary })],
];
export const block: CSSObject = { display: "block" };
export const bottom: EntriesSpecifier = [
  [0, { bottom: "0px" }],
  ["px", { bottom: "1px" }],
  ["auto", { bottom: "auto" }],
  ["full", { bottom: "100%" }],

  [
    reFraction,
    ([, numerator, denominator]) =>
      associatePercent(["bottom"], numerator, denominator),
  ],
  [reNumeric, ([, numeric]) => associateRem(["bottom"], numeric)],
  [
    reBracket$,
    ([, attr]) => ({ bottom: attr }),
  ],
];

export const container: EntriesSpecifier = [
  ["DEFAULT", (_, context) => {
    const SCREEN = "screen";
    const sm = resolveTheme("sm", SCREEN, context);
    const md = resolveTheme("md", SCREEN, context);
    const lg = resolveTheme("lg", SCREEN, context);
    const xl = resolveTheme("xl", SCREEN, context);
    const $2xl = resolveTheme("2xl", SCREEN, context);
    if (sm && md && lg && xl && $2xl) {
      const specifier: CSSStatement[] = [
        { type: "ruleset", declaration: { width: "100%" } },
        {
          type: "groupAtRule",
          identifier: "media",
          rule: minWidthMediaQuery(sm),
          children: {
            type: "ruleset",
            declaration: {
              "max-width": sm,
            },
          },
        },
        {
          type: "groupAtRule",
          identifier: "media",
          rule: minWidthMediaQuery(md),
          children: {
            type: "ruleset",
            declaration: {
              "max-width": md,
            },
          },
        },
        {
          type: "groupAtRule",
          identifier: "media",
          rule: minWidthMediaQuery(lg),
          children: {
            type: "ruleset",
            declaration: {
              "max-width": lg,
            },
          },
        },
        {
          type: "groupAtRule",
          identifier: "media",
          rule: minWidthMediaQuery(xl),
          children: {
            type: "ruleset",
            declaration: {
              "max-width": xl,
            },
          },
        },
        {
          type: "groupAtRule",
          identifier: "media",
          rule: minWidthMediaQuery($2xl),
          children: {
            type: "ruleset",
            declaration: {
              "max-width": $2xl,
            },
          },
        },
      ];
      return specifier;
    }
  }],
];
export const clear: Specifier = {
  right: { clear: "right" },
  left: { clear: "left" },
  both: { clear: "both" },
  none: { clear: "none" },
};
export const columns: EntriesSpecifier = [
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
  [rePositiveNumber, ([, n]) =>
    parseNumeric(n).match({
      some: (number) => ({ columns: number }),
      none: undefined,
    })],
];
export const float: Specifier = {
  right: { float: "right" },
  left: { float: "left" },
  none: { float: "none" },
};
export const grow: EntriesSpecifier = [
  ["DEFAULT", { "flex-grow": 1 }],
  [rePositiveNumber, ([, pNumber]) => associateNumeric(["flex-grow"], pNumber)],
];
export const h: Specifier = [
  [0, { height: "0px" }],
  ["px", { height: "1px" }],
  ["auto", { height: "auto" }],
  ["full", { height: "100%" }],
  ["screen", { height: "100vh" }],
  ["min", { height: "min-content" }],
  ["max", { height: "max-content" }],
  ["fit", { height: "fit-content" }],
  [reNumeric, ([, numeric]) => {
    return remBy(numeric, (rem) => ({
      height: rem,
    }));
  }],
  [reFraction, ([, numerator, denominator]) => {
    return fractionBy(numerator, denominator, (percent) => ({
      height: percent,
    }));
  }],
  [reBracket$, ([, body]) => ({
    height: body,
  })],
];
export const indent: EntriesSpecifier = [
  [0, { "text-indent": "0px" }],
  ["px", { "text-indent": "1px" }],
  [reNumeric, ([, numeric]) => associateRem(["text-indent"], numeric)],
];
export const inline: Specifier = {
  DEFAULT: { display: "inline" },
  block: { display: "inline-block" },
  flex: { display: "inline-flex" },
  table: { display: "inline-table" },
  grid: { display: "inline-grid" },
};
export const isolate: CSSObject = { isolation: "isolate" };
export const isolation: Specifier = {
  auto: {
    isolation: "auto",
  },
};
export const items: Specifier = {
  center: { "align-items": "center" },
  start: { "align-items": "flex-start" },
  end: { "align-items": "flex-end" },
  baseline: { "align-items": "baseline" },
  stretch: { "align-items": "stretch" },
};
export const leading: Specifier = [
  ["none", { "line-height": 1 }],
  ["tight", { "line-height": 1.25 }],
  ["snug", { "line-height": 1.375 }],
  ["normal", { "line-height": 1.5 }],
  ["relaxed", { "line-height": 1.625 }],
  ["loose", { "line-height": 2 }],
  [rePositiveNumber, ([, number]) => {
    return remBy(number, (rem) => ({ "line-height": rem }));
  }],
];
export const left: EntriesSpecifier = [
  [0, { left: "0px" }],
  ["px", { left: "1px" }],
  ["auto", { left: "auto" }],
  ["full", { left: "100%" }],

  [
    reFraction,
    ([, numerator, denominator]) =>
      associatePercent(["left"], numerator, denominator),
  ],
  [reNumeric, ([, numeric]) => associateRem(["left"], numeric)],
  [
    reBracket$,
    ([, attr]) => ({ left: attr }),
  ],
];
export const m: Specifier = [
  ["0", { margin: "0px" }],
  ["auto", { margin: "auto" }],
  ["px", { margin: "1px" }],
  [reNumeric, ([, numeric]) => associateRem(["margin"], numeric)],
  [reBracket$, ([, arbitrary]) => ({ margin: arbitrary })],
];
export const mb: Specifier = [
  ["0", { "margin-bottom": "0px" }],
  ["auto", { "margin-bottom": "auto" }],
  ["px", { "margin-bottom": "1px" }],
  [reNumeric, ([, numeric]) => associateRem(["margin-bottom"], numeric)],
  [
    reBracket$,
    ([, arbitrary]) => ({ "margin-bottom": arbitrary }),
  ],
];
export const mix: EntriesSpecifier = [
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
export const ml: Specifier = [
  ["0", { "margin-left": "0px" }],
  ["auto", { "margin-left": "auto" }],
  ["px", { "margin-left": "1px" }],
  [reNumeric, ([, numeric]) => associateRem(["margin-left"], numeric)],
  [
    reBracket$,
    ([, arbitrary]) => ({ "margin-left": arbitrary }),
  ],
];
export const mr: Specifier = [
  ["0", { "margin-right": "0px" }],
  ["auto", { "margin-right": "auto" }],
  ["px", { "margin-right": "1px" }],
  [reNumeric, ([, numeric]) => associateRem(["margin-right"], numeric)],
  [
    reBracket$,
    ([, arbitrary]) => ({ "margin-right": arbitrary }),
  ],
];
export const mt: Specifier = [
  ["0", { "margin-top": "0px" }],
  ["auto", { "margin-top": "auto" }],
  ["px", { "margin-top": "1px" }],
  [reNumeric, ([, numeric]) => associateRem(["margin-top"], numeric)],
  [
    reBracket$,
    ([, arbitrary]) => ({ "margin-top": arbitrary }),
  ],
];
export const mx: Specifier = [
  ["0", { "margin-left": "0px", "margin-right": "0px" }],
  ["auto", { "margin-left": "auto", "margin-right": "auto" }],
  ["px", { "margin-left": "1px", "margin-right": "1px" }],
  [
    reNumeric,
    ([, numeric]) => associateRem(["margin-left", "margin-right"], numeric),
  ],
  [
    reBracket$,
    ([, arbitrary]) =>
      associateWith(["margin-left", "margin-right"], () => arbitrary),
  ],
];
export const my: Specifier = [
  ["0", { "margin-top": "0px", "margin-bottom": "0px" }],
  ["auto", { "margin-top": "auto", "margin-bottom": "auto" }],
  ["px", { "margin-top": "1px", "margin-bottom": "1px" }],
  [
    reNumeric,
    ([, numeric]) => associateRem(["margin-top", "margin-bottom"], numeric),
  ],
  [
    reBracket$,
    ([, arbitrary]) =>
      associateWith(["margin-top", "margin-bottom"], () => arbitrary),
  ],
];
export const opacity: EntriesSpecifier = [
  [rePositiveNumber, ([, pNumber]) => associatePer100(["opacity"], pNumber)],
];
export const order: EntriesSpecifier = [
  ["first", { order: -9999 }],
  ["last", { order: 9999 }],
  ["none", { order: 0 }],
  [
    rePositiveNumber,
    ([, pNumber]) => associateNumeric(["order"], pNumber),
  ],
];
export const p: Specifier = [
  ["0", { padding: "0px" }],
  ["auto", { padding: "auto" }],
  ["px", { padding: "1px" }],
  [reNumeric, ([, numeric]) => associateRem(["padding"], numeric)],
  [reBracket$, ([, arbitrary]) => ({ padding: arbitrary })],
];
export const pb: Specifier = [
  ["0", { "padding-bottom": "0px" }],
  ["auto", { "padding-bottom": "auto" }],
  ["px", { "padding-bottom": "1px" }],
  [reNumeric, ([, numeric]) => associateRem(["padding-bottom"], numeric)],
  [
    reBracket$,
    ([, arbitrary]) => ({ "padding-bottom": arbitrary }),
  ],
];
export const pl: Specifier = [
  ["0", { "padding-left": "0px" }],
  ["auto", { "padding-left": "auto" }],
  ["px", { "padding-left": "1px" }],
  [reNumeric, ([, numeric]) => associateRem(["padding-left"], numeric)],
  [
    reBracket$,
    ([, arbitrary]) => ({ "padding-left": arbitrary }),
  ],
];
export const pr: Specifier = [
  ["0", { "padding-right": "0px" }],
  ["auto", { "padding-right": "auto" }],
  ["px", { "padding-right": "1px" }],
  [reNumeric, ([, numeric]) => associateRem(["padding-right"], numeric)],
  [
    reBracket$,
    ([, arbitrary]) => ({ "padding-right": arbitrary }),
  ],
];
export const pt: Specifier = [
  ["0", { "padding-top": "0px" }],
  ["auto", { "padding-top": "auto" }],
  ["px", { "padding-top": "1px" }],
  [reNumeric, ([, numeric]) => associateRem(["padding-top"], numeric)],
  [
    reBracket$,
    ([, arbitrary]) => ({ "padding-top": arbitrary }),
  ],
];
export const px: Specifier = [
  ["0", { "padding-left": "0px", "padding-right": "0px" }],
  ["auto", { "padding-left": "auto", "padding-right": "auto" }],
  ["px", { "padding-left": "1px", "padding-right": "1px" }],
  [
    reNumeric,
    ([, numeric]) => associateRem(["padding-left", "padding-right"], numeric),
  ],
  [
    reBracket$,
    ([, arbitrary]) =>
      associateWith(["padding-left", "padding-right"], () => arbitrary),
  ],
];
export const py: Specifier = [
  ["0", { "padding-top": "0px", "padding-bottom": "0px" }],
  ["auto", { "padding-top": "auto", "padding-bottom": "auto" }],
  ["px", { "padding-top": "1px", "padding-bottom": "1px" }],
  [
    reNumeric,
    ([, numeric]) => associateRem(["padding-top", "padding-bottom"], numeric),
  ],
  [
    reBracket$,
    ([, arbitrary]) =>
      associateWith(["padding-top", "padding-bottom"], () => arbitrary),
  ],
];
export const right: EntriesSpecifier = [
  [0, { right: "0px" }],
  ["px", { right: "1px" }],
  ["auto", { right: "auto" }],
  ["full", { right: "100%" }],

  [
    reFraction,
    ([, numerator, denominator]) =>
      associatePercent(["right"], numerator, denominator),
  ],
  [reNumeric, ([, numeric]) => associateRem(["right"], numeric)],
  [
    reBracket$,
    ([, attr]) => ({ right: attr }),
  ],
];
export const shrink: EntriesSpecifier = [
  ["DEFAULT", { "flex-shrink": 1 }],
  [
    rePositiveNumber,
    ([, pNumber]) => associateNumeric(["flex-shrink"], pNumber),
  ],
];
export const top: EntriesSpecifier = [
  [0, { top: "0px" }],
  ["px", { top: "1px" }],
  ["auto", { top: "auto" }],
  ["full", { top: "100%" }],

  [
    reFraction,
    ([, numerator, denominator]) =>
      associatePercent(["top"], numerator, denominator),
  ],
  [reNumeric, ([, numeric]) => associateRem(["top"], numeric)],
  [reBracket$, ([, attr]) => ({ "top": attr })],
];
const LETTER_SPACING = "letter-spacing";

export const tracking: Specifier = [
  ["tighter", { [LETTER_SPACING]: "-0.05em" }],
  ["tight", { [LETTER_SPACING]: "-0.025em" }],
  ["normal", { [LETTER_SPACING]: "0em" }],
  ["wide", { [LETTER_SPACING]: "0.025em" }],
  ["wider", { [LETTER_SPACING]: "0.05em" }],
  ["widest", { [LETTER_SPACING]: "0.1em" }],
];
export const w: Specifier = [
  [0, { width: "0px" }],
  ["px", { width: "1px" }],
  ["full", { width: "100%" }],
  ["auto", { width: "auto" }],
  ["screen", { width: "100vw" }],
  ["min", { width: "min-content" }],
  ["max", { width: "max-content" }],
  ["fit", { width: "fit-content" }],
  [reNumeric, ([, numeric]) => {
    return remBy(numeric, (rem) => ({
      width: rem,
    }));
  }],
  [reFraction, ([, numerator, denominator]) => {
    return fractionBy(numerator, denominator, (percent) => ({
      width: percent,
    }));
  }],
  [reBracket$, ([, arbitrary]) => ({ width: arbitrary })],
];
const WHITE_SPACE = "white-space";

export const whitespace: Specifier = [
  ["normal", { [WHITE_SPACE]: "normal" }],
  ["nowrap", { [WHITE_SPACE]: "nowrap" }],
  ["pre", {
    DEFAULT: { [WHITE_SPACE]: "pre" },
    line: { [WHITE_SPACE]: "pre-line" },
    wrap: { [WHITE_SPACE]: "pre-wrap" },
  }],
];
export const z: Specifier = [["auto", {
  "z-index": "auto",
}], [rePositiveNumber, ([, positiveNumber]) => {
  return numericBy(positiveNumber, (number) => ({
    "z-index": number,
  }));
}]];
export const $static: CSSObject = {
  position: "static",
};
export const fixed: CSSObject = {
  position: "fixed",
};
export const absolute: CSSObject = {
  position: "absolute",
};
export const relative: CSSObject = {
  position: "relative",
};
export const sticky: CSSObject = {
  position: "sticky",
};
export const visible: CSSObject = {
  visibility: "visible",
};
export const invisible: CSSObject = {
  visibility: "hidden",
};
export const antialiased: CSSObject = {
  "-webkit-font-smoothing": "antialiased",
  "-moz-osx-font-smoothing": "grayscale",
};
export const subpixel: Specifier = {
  antialiased: {
    "-webkit-font-smoothing": "auto",
    "-moz-osx-font-smoothing": "auto",
  },
};
export const italic: CSSObject = {
  "font-style": "italic",
};
export const contents: CSSObject = {
  display: "contents",
};
export const hidden: CSSObject = {
  display: "none",
};
export const overline: CSSObject = {
  "text-decoration-line": "overline",
};
export const line: Specifier = {
  through: { "text-decoration-line": "line-through" },
};
export const no: Specifier = {
  underline: { "text-decoration-line": "none" },
};
export const sr: Specifier = {
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
export const ordinal: CSSObject = { "font-variant-numeric": "ordinal" };
export const slashed: RecordSpecifier = {
  zero: { "font-variant-numeric": "slashed-zero" },
};
export const lining: RecordSpecifier = {
  nums: { "font-variant-numeric": "lining-nums" },
};
export const oldstyle: RecordSpecifier = {
  nums: { "font-variant-numeric": "oldstyle-nums" },
};
export const proportional: RecordSpecifier = {
  nums: { "font-variant-numeric": "proportional-nums" },
};
export const tabular: RecordSpecifier = {
  nums: { "font-variant-numeric": "tabular-nums" },
};
export const diagonal: RecordSpecifier = {
  fractions: { "font-variant-numeric": "diagonal-fractions" },
};
export const stacked: RecordSpecifier = {
  fractions: { "font-variant-numeric": "stacked-fractions" },
};
export const uppercase: CSSObject = { "text-transform": "uppercase" };
export const lowercase: CSSObject = { "text-transform": "lowercase" };
export const capitalize: CSSObject = { "text-transform": "capitalize" };
export const truncate: CSSObject = {
  overflow: "hidden",
  "text-overflow": "ellipsis",
  "white-space": "nowrap",
};
export const brightness: EntriesSpecifier = [
  [
    rePositiveNumber,
    ([, pNumber], { variablePrefix }) =>
      parseNumeric(pNumber).map(ratio).map(shortDecimal).match({
        some: (value) =>
          handleSingleFilter("brightness", value, variablePrefix),
        none: undefined,
      }),
  ],
];

export const contrast: EntriesSpecifier = [
  [
    rePositiveNumber,
    ([, pNumber], { variablePrefix }) =>
      handleFilter("contrast", pNumber, variablePrefix),
  ],
];

function handleDrop(value: string, varPrefix: string): CSSObject {
  return {
    [customProperty("drop-shadow", varPrefix)]: value,
    filter: filterValue(varPrefix),
  };
}

export const drop: RecordSpecifier = {
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

export const grayscale: EntriesSpecifier = [
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
): CSSObject {
  return {
    [customProperty(propertyName, varPrefix)]: `${propertyName}(${value})`,
    filter: filterValue(varPrefix),
  };
}

export const hue: RecordSpecifier = {
  rotate: [
    [
      rePositiveNumber,
      ([, pNumber], { variablePrefix }) =>
        parseNumeric(pNumber).map(unit("deg")).match({
          some: (deg) => handleSingleFilter("hue-rotate", deg, variablePrefix),
          none: undefined,
        }),
    ],
  ],
};

export const invert: EntriesSpecifier = [
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

export const saturate: EntriesSpecifier = [
  [
    rePositiveNumber,
    ([, pNumber], { variablePrefix }) =>
      parseNumeric(pNumber).map(ratio).map(shortDecimal).match({
        some: (saturate) =>
          handleSingleFilter("saturate", saturate, variablePrefix),
        none: undefined,
      }),
  ],
];

export const sepia: EntriesSpecifier = [
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

export const duration: EntriesSpecifier = [
  [
    rePositiveNumber,
    ([, pNumber]) =>
      parseNumeric(pNumber).map(unit("ms")).match({
        some: (ms) => ({ "transition-duration": ms }),
        none: undefined,
      }),
  ],
];

export const ease: RecordSpecifier = {
  linear: { "transition-timing-function": "linear" },
  in: {
    DEFAULT: { "transition-timing-function": "cubic-bezier(0.4, 0, 1, 1)" },
    out: { "transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)" },
  },
  out: { "transition-timing-function": "cubic-bezier(0, 0, 0.2, 1)" },
};

export const delay: EntriesSpecifier = [
  [
    rePositiveNumber,
    ([, pNumber]) =>
      parseNumeric(pNumber).map(unit("ms")).match({
        some: (ms) => ({ "transition-delay": ms }),
        none: undefined,
      }),
  ],
];

export const rotate: EntriesSpecifier = [
  [
    rePositiveNumber,
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

export const skew: RecordSpecifier = {
  x: [
    [
      rePositiveNumber,
      ([, pNumber], { variablePrefix }) =>
        parseNumeric(pNumber).map(unit("deg")).match({
          some: (deg) => handleTransform(["skew-x"], deg, variablePrefix),
          none: undefined,
        }),
    ],
  ],
  y: [
    [
      rePositiveNumber,
      ([, pNumber], { variablePrefix }) =>
        parseNumeric(pNumber).map(unit("deg")).match({
          some: (deg) => handleTransform(["skew-y"], deg, variablePrefix),
          none: undefined,
        }),
    ],
  ],
};

export const origin: RecordSpecifier = {
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
export const accent: EntriesSpecifier = [
  ["auto", { "accent-color": "auto" }],
  [reSlashNumber, ([, body, numeric], context) => {
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
  [re$SlashBracket$, ([, body, alpha], context) => {
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
    reAll,
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
export const appearance: RecordSpecifier = {
  none: { appearance: "none" },
};
export const cursor: RecordSpecifier = {
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
export const caret: EntriesSpecifier = [
  [reSlashNumber, ([, body, numeric], context) => {
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
  [re$SlashBracket$, ([, body, alpha], context) => {
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
    reAll,
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
export const pointer: RecordSpecifier = {
  events: {
    none: { "pointer-events": "none" },
    auto: { "pointer-events": "auto" },
  },
};
export const resize: RecordSpecifier = {
  DEFAULT: { resize: "both" },
  none: { resize: "none" },
  x: { resize: "horizontal" },
  y: { resize: "vertical" },
};
export const touch: RecordSpecifier = {
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

export const select: RecordSpecifier = {
  none: { "user-select": "none" },
  text: { "user-select": "text" },
  all: { "user-select": "all" },
  auto: { "user-select": "auto" },
};
export const will: RecordSpecifier = {
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
export const fill: EntriesSpecifier = [
  [reSlashNumber, ([, body, numeric], context) => {
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
  [re$SlashBracket$, ([, body, alpha], context) => {
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
    reAll,
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

export const from: EntriesSpecifier = [
  [
    reAll,
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
export const via: EntriesSpecifier = [
  [
    reAll,
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
export const to: EntriesSpecifier = [
  [
    reAll,
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
