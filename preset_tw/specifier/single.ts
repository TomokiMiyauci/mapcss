import type {
  CSSObject,
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
export const normal: RecordSpecifier = {
  nums: { "font-variant-numeric": "normal" },
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
