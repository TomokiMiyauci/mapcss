import { resolveTheme } from "../../core/resolve.ts";
import { Some } from "../../deps.ts";
import type {
  CSSStatement,
  GlobalModifier,
  ModifierContext,
} from "./../../core/types.ts";

export function minWidthMediaQuery(value: string): string {
  return `(min-width: ${value})`;
}

function breakPointHandler(
  cssStatement: Required<CSSStatement>,
  order: number,
  context: ModifierContext,
): Required<CSSStatement> | undefined {
  return Some(resolveTheme(context.modifier, "screen", context)).map(
    minWidthMediaQuery,
  ).match({
    some: (rule) => ({
      type: "groupAtRule",
      identifier: "media",
      rule,
      children: cssStatement,
    }),
    none: undefined,
  });
}

export const sm: GlobalModifier = {
  type: "global",
  fn: (cssStatement, context) => breakPointHandler(cssStatement, 1, context),
};

export const md: GlobalModifier = {
  type: "global",
  fn: (cssStatement, context) => breakPointHandler(cssStatement, 2, context),
};

export const lg: GlobalModifier = {
  type: "global",
  fn: (cssStatement, context) => breakPointHandler(cssStatement, 3, context),
};

export const xl: GlobalModifier = {
  type: "global",
  fn: (cssStatement, context) => breakPointHandler(cssStatement, 4, context),
};

export const $2xl: GlobalModifier = {
  type: "global",
  fn: (cssStatement, context) => breakPointHandler(cssStatement, 5, context),
};
