import type { Modifier } from "../../core/types.ts";

export const $minus: Modifier = (cssStatement) => {
  if (cssStatement.type === "ruleset") {
    const { declarations, ...rest } = cssStatement;
    const decl = declarations.map(({ property, value }) => ({
      property,
      value: `-${value}`,
    }));
    return {
      ...rest,
      declarations: decl,
    };
  }
  return cssStatement;
};
