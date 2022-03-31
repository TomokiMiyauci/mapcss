// This module is browser compatible.

import { isAtRule, isRule } from "../../core/utils/assert.ts";
import { AtRule } from "../deps.ts";
import { isAllowNode } from "./_utils.ts";
import type { Modifier } from "./../../core/types.ts";
import type { Option } from "../types.ts";

export function createDark(darkMode: Option["darkMode"]) {
  const dark: Modifier = (parentNode) => {
    if (darkMode === "media") {
      parentNode.each((node) => {
        if (isAtRule(node) || isRule(node)) {
          const atRule = new AtRule({
            name: "media",
            params: "(prefers-color-scheme: dark)",
            nodes: [node],
          });

          node.replaceWith(atRule);
        }
      });
      return parentNode;
    }
    if (darkMode === "class") {
      parentNode.walkRules((node) => {
        if (isAllowNode(node)) {
          node.selectors = node.selectors.map((selector) =>
            `.dark ${selector}`
          );
        }
      });
      return parentNode;
    }
    return parentNode;
  };
  return dark;
}
