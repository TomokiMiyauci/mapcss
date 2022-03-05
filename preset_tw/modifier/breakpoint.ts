import { resolveTheme } from "../../core/resolve.ts";
import { isAtRule, isRule } from "../../core/utils/assert.ts";

import { AtRule, Root, Some } from "../../deps.ts";
import type {
  ModifierContext,
  ModifierDefinition,
} from "./../../core/types.ts";

export function minWidthMediaQuery(value: string): string {
  return `(min-width: ${value})`;
}

function breakPointHandler(
  parentNode: Root,
  context: ModifierContext,
): Root | undefined {
  return Some(resolveTheme(context.modifier, "screen", context)).map(
    minWidthMediaQuery,
  ).match({
    some: (rule) => {
      parentNode.each((node) => {
        if (isAtRule(node) || isRule(node)) {
          const atRule = new AtRule({
            name: "media",
            params: rule,
            nodes: [node],
          });

          node.replaceWith(atRule);
        }
      });

      return parentNode;
    },
    none: undefined,
  });
}

export const sm: ModifierDefinition = (childNodes, context) =>
  breakPointHandler(childNodes, context);

export const md: ModifierDefinition = (cssStatement, context) =>
  breakPointHandler(cssStatement, context);

export const lg: ModifierDefinition = (cssStatement, context) =>
  breakPointHandler(cssStatement, context);

export const xl: ModifierDefinition = (cssStatement, context) =>
  breakPointHandler(cssStatement, context);

export const $2xl: ModifierDefinition = (cssStatement, context) =>
  breakPointHandler(cssStatement, context);
