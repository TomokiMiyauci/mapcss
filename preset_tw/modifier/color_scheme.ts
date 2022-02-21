import type { Modifier } from "./../../core/types.ts";

export const dark: Modifier = (cssStatement, { modifier }) => {
  if (cssStatement.type === "ruleset") {
    cssStatement.selector = `.${modifier} ${cssStatement.selector}`;
  }
  return cssStatement;
};
