import type { ModifierDefinition } from "./../../core/types.ts";

export const dark: ModifierDefinition = (parentNode, { modifier }) => {
  parentNode.walkRules((node) => {
    node.selectors = node.selectors.map((selector) =>
      `.${modifier} ${selector}`
    );
  });
  return parentNode;
};
