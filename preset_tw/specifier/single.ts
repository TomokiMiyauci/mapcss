import { rePositiveNumber } from "../../core/utils/regexp.ts";
import { filterValue, handleFilter } from "./_filter_utils.ts";
import { parseNumeric } from "../../core/utils/monad.ts";
import {
  customProperty,
  ratio,
  shortDecimal,
  unit,
} from "../../core/utils/format.ts";
import type {
  CSSObject,
  EntriesSpecifier,
  RecordSpecifier,
  Specifier,
} from "../../core/types.ts";

export const block: CSSObject = { display: "block" };
export const isolate: CSSObject = { isolation: "isolate" };
export const isolation: Specifier = {
  auto: {
    isolation: "auto",
  },
};
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
