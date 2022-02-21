import type { ModifierDefinition } from "../../core/types.ts";

export const $minus: ModifierDefinition = (cssStatement) => {
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
