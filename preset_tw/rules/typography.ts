import { isNumber, isString } from "../../deps.ts";
import { resolveTheme } from "../../core/utils/resolver.ts";
import { colorByProp, colorOpacityByProp } from "./_utils.ts";
import type { PresetTwTheme } from "../theme/types.ts";
import type { Rule } from "../../core/types.ts";

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
