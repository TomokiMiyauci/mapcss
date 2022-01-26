import { isString, prop } from "../../deps.ts";
import type { Rule } from "../../core/types.ts";

export const margins: Rule[] = [
  [/^mx-(.+)$/, ([, body], { theme }) => {
    const margin = prop(body, theme.margin);
    if (isString(margin)) {
      return {
        "margin-left": margin,
        "margin-right": margin,
      };
    }
  }],
  [/^my-(.+)$/, ([, body], { theme }) => {
    const margin = prop(body, theme.margin);
    if (isString(margin)) {
      return {
        "margin-top": margin,
        "margin-bottom": margin,
      };
    }
  }],
  [/^mt-(.+)$/, ([, body], { theme }) => {
    const margin = prop(body, theme.margin);
    if (isString(margin)) {
      return {
        "margin-top": margin,
      };
    }
  }],
  [/^mb-(.+)$/, ([, body], { theme }) => {
    const margin = prop(body, theme.margin);
    if (isString(margin)) {
      return {
        "margin-bottom": margin,
      };
    }
  }],
  [/^mr-(.+)$/, ([, body], { theme }) => {
    const margin = prop(body, theme.margin);
    if (isString(margin)) {
      return {
        "margin-right": margin,
      };
    }
  }],
  [/^ml-(.+)$/, ([, body], { theme }) => {
    const margin = prop(body, theme.margin);
    if (isString(margin)) {
      return {
        "margin-left": margin,
      };
    }
  }],
  [/^m-(.+)$/, ([, body], { theme }) => {
    const margin = prop(body, theme.margin);
    if (isString(margin)) {
      return {
        margin,
      };
    }
  }],
];
