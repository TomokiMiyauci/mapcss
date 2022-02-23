import type { ModifierDefinition } from "../../core/types.ts";

export const $minus: ModifierDefinition = (parentNode) => {
  parentNode.walkDecls((decl) => {
    decl.value = `-${decl.value}`;
  });
  return parentNode;
};
