import type { Modifier } from "../../core/types.ts";

export const $minus: Modifier = (parentNode) => {
  parentNode.walkDecls((decl) => {
    decl.value = `-${decl.value}`;
  });
  return parentNode;
};
