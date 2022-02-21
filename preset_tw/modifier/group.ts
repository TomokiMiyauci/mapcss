import type { Modifier } from "../../core/types.ts";

export const group: Modifier = {
  hover: (cssStatement, context) => {
    const selector = context.path.join(":");
    if (cssStatement.type === "ruleset") {
      cssStatement.selector = `.${selector} ${cssStatement.selector}`;
    }

    return cssStatement;
  },
};
