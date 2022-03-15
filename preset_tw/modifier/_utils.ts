import { Node } from "../../deps.ts";
import type { Modifier, ModifierContext } from "../../core/types.ts";
import { isAtRule } from "../../core/utils/assert.ts";

export function isAllowNode(node: Node): boolean {
  if (!node.parent) return false;
  if (!isAtRule(node.parent)) return true;

  return ["media", "supports"].includes(node.parent.name);
}

export function selectorTransform(
  transform: (selector: string, context: ModifierContext) => string,
): Modifier {
  return (root, _, context) => {
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
