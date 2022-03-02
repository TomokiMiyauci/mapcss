import { isAllowNode } from "./_utils.ts";
import type { ModifierDefinition } from "./../../core/types.ts";

export function pseudoHandler(pseudo: string): ModifierDefinition {
  const pseudoHandler: ModifierDefinition = (root) => {
    root.walkRules((node) => {
      if (isAllowNode(node)) {
        node.selectors = node.selectors.map((selector) =>
          `${selector}${pseudo}`
        );
      }
    });

    return root;
  };
  return pseudoHandler;
}

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
