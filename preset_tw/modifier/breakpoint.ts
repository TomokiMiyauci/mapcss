import { resolveTheme } from "../../core/resolve.ts";
import { Some } from "../../deps.ts";
import type {
  CSSStatement,
  ModifierContext,
  ModifierDefinition,
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

export const sm: ModifierDefinition = (cssStatement, context) =>
  breakPointHandler(cssStatement, 1, context);

export const md: ModifierDefinition = (cssStatement, context) =>
  breakPointHandler(cssStatement, 2, context);

export const lg: ModifierDefinition = (cssStatement, context) =>
  breakPointHandler(cssStatement, 3, context);

export const xl: ModifierDefinition = (cssStatement, context) =>
  breakPointHandler(cssStatement, 4, context);

export const $2xl: ModifierDefinition = (cssStatement, context) =>
  breakPointHandler(cssStatement, 5, context);
