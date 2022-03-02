import { isAllowNode } from "./_utils.ts";
import type { ModifierDefinition } from "./../../core/types.ts";

export const pseudoHandler: ModifierDefinition = (root, { modifier }) => {
  root.walkRules((node) => {
    if (isAllowNode(node)) {
      node.selectors = node.selectors.map((selector) =>
        `${selector}:${modifier}`
      );
    }
  });

  return root;
};

export const scrollbar: ModifierDefinition = (parent) => {
  parent.walkRules((rule) => {
    rule.selector = `${rule.selector}::-webkit-scrollbar`;
  });
  return parent;
};

export const scrollbarTrack: ModifierDefinition = (parent) => {
  parent.walkRules((rule) => {
    rule.selector = `${rule.selector}::-webkit-scrollbar-track`;
  });
  return parent;
};

export const scrollbarThumb: ModifierDefinition = (parent) => {
  parent.walkRules((rule) => {
    rule.selector = `${rule.selector}::-webkit-scrollbar-thumb`;
  });
  return parent;
};
