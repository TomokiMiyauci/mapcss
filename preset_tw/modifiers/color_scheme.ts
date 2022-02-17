import type { GlobalModifier } from "./../../core/types.ts";

export const dark: GlobalModifier = {
  type: "global",
  fn: (cssStatement, { modifier }) => {
    if (cssStatement.type === "ruleset") {
      cssStatement.selector.basic =
        `.${modifier} ${cssStatement.selector.basic}`;
    }
    return cssStatement;
  },
};
