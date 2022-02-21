import type { ModifierDefinition } from "../../core/types.ts";

export const $important: ModifierDefinition = (cssStatement) => {
  if (cssStatement.type === "ruleset") {
    const { declarations, ...rest } = cssStatement;
    const decl = declarations.map(({ property, value }) => ({
      property,
      value: `${value} !important`,
    }));
    return {
      ...rest,
      declarations: decl,
    };
  }
  return cssStatement;
};
