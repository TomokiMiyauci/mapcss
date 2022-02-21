import { resolveTheme } from "../../core/resolve.ts";
import { Some } from "../../deps.ts";
import type {
  CSSStatement,
  Modifier,
  ModifierContext,
} from "./../../core/types.ts";

export function minWidthMediaQuery(value: string): string {
  return `(min-width: ${value})`;
}

function breakPointHandler(
  cssStatement: CSSStatement,
  order: number,
  context: ModifierContext,
): CSSStatement | undefined {
  return Some(resolveTheme(context.modifier, "screen", context)).map(
    minWidthMediaQuery,
  ).match({
    some: (rule) => ({
      type: "groupAtRule",
      identifier: "media",
      order,
      rule,
      children: cssStatement,
    }),
    none: undefined,
  });
}

export const sm: Modifier = (cssStatement, context) =>
  breakPointHandler(cssStatement, 1, context);

export const md: Modifier = (cssStatement, context) =>
  breakPointHandler(cssStatement, 2, context);

export const lg: Modifier = (cssStatement, context) =>
  breakPointHandler(cssStatement, 3, context);

export const xl: Modifier = (cssStatement, context) =>
  breakPointHandler(cssStatement, 4, context);

export const $2xl: Modifier = (cssStatement, context) =>
  breakPointHandler(cssStatement, 5, context);
