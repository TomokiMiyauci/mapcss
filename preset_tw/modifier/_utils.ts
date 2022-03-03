import { Rule } from "../../deps.ts";
import type { ModifierContext, ModifierDefinition } from "../../core/types.ts";
import { isAtRule } from "../../core/utils/assert.ts";

export function isAllowNode(node: Rule): boolean {
  if (!isAtRule(node.parent)) return true;

  return ["media", "supports"].includes(node.parent.name);
}

export function selectorTransform(
  transform: (selector: string, context: ModifierContext) => string,
): ModifierDefinition {
  return (root, context) => {
    root.walkRules((rule) => {
      if (isAllowNode(rule)) {
        rule.selectors = rule.selectors.map((selector) =>
          transform(selector, context)
        );
      }
    });

    return root;
  };
}
