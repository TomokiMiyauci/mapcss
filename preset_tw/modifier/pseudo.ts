import type { Modifier } from "./../../core/types.ts";

export const pseudo: Modifier = (cssStatement, { modifier }) => {
  if (cssStatement.type === "ruleset") {
    cssStatement.selector = `${cssStatement.selector}:${modifier}`;
  }
  return cssStatement;
};
export const scrollbar: Modifier = (cssStatement) => {
  if (cssStatement.type === "ruleset") {
    cssStatement.selector = `${cssStatement.selector}::-webkit-scrollbar`;
  }
  return cssStatement;
};

export const scrollbarTrack: Modifier = (cssStatement) => {
  if (cssStatement.type === "ruleset") {
    cssStatement.selector = `${cssStatement.selector}::-webkit-scrollbar-track`;
  }
  return cssStatement;
};

export const scrollbarThumb: Modifier = (cssStatement) => {
  if (cssStatement.type === "ruleset") {
    cssStatement.selector = `${cssStatement.selector}::-webkit-scrollbar-thumb`;
  }
  return cssStatement;
};
