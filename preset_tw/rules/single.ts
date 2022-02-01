import type { CSSObject, Mapper } from "../../core/types.ts";

export const block: CSSObject = { display: "block" };
export const isolate: CSSObject = { isolation: "isolate" };
export const isolation: Mapper = {
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
export const subpixel: Mapper = {
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
export const line: Mapper = {
  through: { "text-decoration-line": "line-through" },
};
export const no: Mapper = {
  underline: { "text-decoration-line": "none" },
};
