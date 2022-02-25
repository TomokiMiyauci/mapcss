import type { Modifier } from "../../core/types.ts";

export const group: Modifier = {
  hover: (parent, context) => {
    const selector = context.path.join(":");
    parent.walkRules((rule) => {
      rule.selector = `.${selector} ${rule.selector}`;
    });
    return parent;
  },
};
