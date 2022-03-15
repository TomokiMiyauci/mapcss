import { Declaration } from "../../deps.ts";
import { customProperty, varFn } from "../../core/utils/format.ts";
import type { Modifier } from "../../core/types.ts";

export const content: Modifier = (
  root,
  { id },
  { variablePrefix },
) => {
  const CONTENT = "content";
  root.walkRules((node) => {
    node.selectors = node.selectors.map((selector) => `${selector}::${id}`);
    node.walkDecls(CONTENT, (child) => {
      child.remove();
    });

    const decl = new Declaration({
      prop: CONTENT,
      value: varFn(customProperty(CONTENT, variablePrefix)),
    });

    node.append(decl);
  });
  return root;
};
