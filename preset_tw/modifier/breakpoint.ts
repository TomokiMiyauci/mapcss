// This module is browser compatible.

import { resolveTheme } from "../../core/resolve.ts";
import { isAtRule, isRule } from "../../core/utils/assert.ts";

import { AtRule, Some } from "../deps.ts";
import type { Modifier, ModifierDefinition } from "./../../core/types.ts";

export function minWidthMediaQuery(value: string): string {
  return `(min-width: ${value})`;
}

const breakPointHandler: Modifier = (
  parentNode,
  { id },
  context,
) => {
  return Some(resolveTheme(id, "screen", context)).map(
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
};

export const sm: ModifierDefinition = (childNodes, _, context) =>
  breakPointHandler(childNodes, _, context);

export const md: ModifierDefinition = (cssStatement, _, context) =>
  breakPointHandler(cssStatement, _, context);

export const lg: ModifierDefinition = (cssStatement, _, context) =>
  breakPointHandler(cssStatement, _, context);

export const xl: ModifierDefinition = (cssStatement, _, context) =>
  breakPointHandler(cssStatement, _, context);

export const $2xl: ModifierDefinition = (cssStatement, _, context) =>
  breakPointHandler(cssStatement, _, context);
