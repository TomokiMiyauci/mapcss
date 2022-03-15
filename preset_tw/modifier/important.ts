import type { Modifier } from "../../core/types.ts";

export const $important: Modifier = (parentNode) => {
  parentNode.walkDecls((decl) => {
    decl.important = true;
  });

  return parentNode;
};
