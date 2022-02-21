import type { ModifierDefinition } from "./../../core/types.ts";

export const dark: ModifierDefinition = (cssStatement, { modifier }) => {
  if (cssStatement.type === "ruleset") {
    cssStatement.selector = `.${modifier} ${cssStatement.selector}`;
  }
  return cssStatement;
};
