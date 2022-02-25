import type { ModifierDefinition } from "../../core/types.ts";

export const $important: ModifierDefinition = (parentNode) => {
  parentNode.walkDecls((decl) => {
    decl.important = true;
  });

  return parentNode;
};
