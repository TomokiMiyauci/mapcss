import { Rule } from "../../deps.ts";
import { isAtRule } from "../../core/utils/assert.ts";

export function isAllowNode(node: Rule): boolean {
  if (!isAtRule(node.parent)) return true;

  return ["media", "supports"].includes(node.parent.name);
}
