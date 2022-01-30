import { CENTER, LEFT, RIGHT } from "../../constants.ts";
import { isNumber, isString } from "../../deps.ts";
import { resolveTheme } from "../../core/utils/resolver.ts";
import { colorByProp, colorOpacityByProp } from "./_utils.ts";
import type { PresetTwTheme } from "../theme/types.ts";
import type { Rule } from "../../core/types.ts";

const LETTER_SPACING = "letter-spacing";

export const letterSpacings: Rule[] = [
  ["tracking-tighter", { [LETTER_SPACING]: "-0.05em" }],
  ["tracking-tight", { [LETTER_SPACING]: "-0.025em" }],
  ["tracking-normal", { [LETTER_SPACING]: "0em" }],
  ["tracking-wide", { [LETTER_SPACING]: "0.025em" }],
  ["tracking-wider", { [LETTER_SPACING]: "0.05em" }],
  ["tracking-widest", { [LETTER_SPACING]: "0.1em" }],
];

const TEXT_ALIGN = "text-align";
export const textAligns: Rule[] = [
  ["text-center", { [TEXT_ALIGN]: CENTER }],
  ["text-left", { [TEXT_ALIGN]: LEFT }],
  ["text-right", { [TEXT_ALIGN]: RIGHT }],
  ["text-justify", { [TEXT_ALIGN]: "justify" }],
];

export const fontSmoothings: Rule[] = [
  ["antialiased", {
    "-webkit-font-smoothing": "antialiased",
    "-moz-osx-font-smoothing": "grayscale",
  }],
  ["subpixel-antialiased", {
    "-webkit-font-smoothing": "auto",
    "-moz-osx-font-smoothing": "auto",
  }],
];

export const lineHeights: Rule[] = [
  [/^leading-(.+)$/, ([, path], { theme }) => {
    const lineHeight = resolveTheme(theme as PresetTwTheme, {
      path,
      scope: "lineHeight",
    });
    if (isString(lineHeight) || isNumber(lineHeight)) {
      return {
        "line-height": lineHeight,
      };
    }
  }],
];

export const colors: Rule[] = [
  [/^text-(.+)\/(\d+)$/, ([, prop, opacity], { theme }) => {
    return colorOpacityByProp("color", { theme, prop, opacity });
  }],
  [/^text-(.+)$/, ([, prop], { theme }) => {
    return colorByProp("color", { theme, prop });
  }],
];

const VERTICAL_ALIGN = "vertical-align";

export const verticalAligns: Rule[] = [
  ["align-baseline", { [VERTICAL_ALIGN]: "baseline" }],
  ["align-top", { [VERTICAL_ALIGN]: "top" }],
  ["align-middle", { [VERTICAL_ALIGN]: "middle" }],
  ["align-bottom", { [VERTICAL_ALIGN]: "bottom" }],
  ["align-text-top", { [VERTICAL_ALIGN]: "text-top" }],
  ["align-text-bottom", { [VERTICAL_ALIGN]: "text-bottom" }],
  ["align-sub", { [VERTICAL_ALIGN]: "sub" }],
  ["align-super", { [VERTICAL_ALIGN]: "super" }],
];

const WHITE_SPACE = "white-space";

export const whiteSpaces: Rule[] = [
  ["whitespace-normal", {
    [WHITE_SPACE]: "normal",
  }],
  ["whitespace-nowrap", {
    [WHITE_SPACE]: "nowrap",
  }],
  ["whitespace-pre", {
    [WHITE_SPACE]: "pre",
  }],
  ["whitespace-pre-line", {
    [WHITE_SPACE]: "pre-line",
  }],
  ["whitespace-pre-wrap", {
    [WHITE_SPACE]: "pre-wrap",
  }],
];

export const wordBreaks: Rule[] = [
  ["break-normal", { "word-break": "normal", "overflow-wrap": "normal" }],
  ["break-words", { "overflow-wrap": "break-word" }],
  ["break-all", { "word-break": "break-all" }],
];

export const contents: Rule[] = [
  ["content-none", { "content": "none" }],
];
