import type { ModifierDefinition } from "./../../core/types.ts";

export const pseudo: ModifierDefinition = (cssStatement, { modifier }) => {
  if (cssStatement.type === "ruleset") {
    cssStatement.selector = `${cssStatement.selector}:${modifier}`;
  }
  return cssStatement;
};
export const scrollbar: ModifierDefinition = (cssStatement) => {
  if (cssStatement.type === "ruleset") {
    cssStatement.selector = `${cssStatement.selector}::-webkit-scrollbar`;
  }
  return cssStatement;
};

export const scrollbarTrack: ModifierDefinition = (cssStatement) => {
  if (cssStatement.type === "ruleset") {
    cssStatement.selector = `${cssStatement.selector}::-webkit-scrollbar-track`;
  }
  return cssStatement;
};

export const scrollbarThumb: ModifierDefinition = (cssStatement) => {
  if (cssStatement.type === "ruleset") {
    cssStatement.selector = `${cssStatement.selector}::-webkit-scrollbar-thumb`;
  }
  return cssStatement;
};
