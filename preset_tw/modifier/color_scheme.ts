import { isAtRule, isRule } from "../../core/utils/assert.ts";
import { AtRule, Rule } from "../../deps.ts";
import type { ModifierDefinition } from "./../../core/types.ts";
import type { Option } from "../types.ts";

function isAllowNode(node: Rule): boolean {
  if (!isAtRule(node.parent)) return true;

  return ["media", "supports"].includes(node.parent.name);
}

export function createDark(darkMode: Option["darkMode"]) {
  const dark: ModifierDefinition = (parentNode, { modifier }) => {
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
            `.${modifier} ${selector}`
          );
        }
      });
      return parentNode;
    }
    return parentNode;
  };
  return dark;
}
