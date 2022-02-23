import { resolveTheme } from "../../core/resolve.ts";

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
  _: number,
  context: ModifierContext,
): Root | undefined {
  return Some(resolveTheme(context.modifier, "screen", context)).map(
    minWidthMediaQuery,
  ).match({
    some: (rule) => {
      parentNode.nodes = parentNode.nodes.map((childNode) =>
        new AtRule({
          name: "media",
          params: rule,
          nodes: [childNode],
        })
      );
      return parentNode;
    },
    none: undefined,
  });
}

export const sm: ModifierDefinition = (childNodes, context) =>
  breakPointHandler(childNodes, 1, context);

export const md: ModifierDefinition = (cssStatement, context) =>
  breakPointHandler(cssStatement, 2, context);

export const lg: ModifierDefinition = (cssStatement, context) =>
  breakPointHandler(cssStatement, 3, context);

export const xl: ModifierDefinition = (cssStatement, context) =>
  breakPointHandler(cssStatement, 4, context);

export const $2xl: ModifierDefinition = (cssStatement, context) =>
  breakPointHandler(cssStatement, 5, context);
