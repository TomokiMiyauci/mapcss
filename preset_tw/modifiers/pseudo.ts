import type { GlobalModifier } from "./../../core/types.ts";

export const pseudo: GlobalModifier = {
  type: "global",
  fn: (cssStatement, { modifier }) => {
    if (cssStatement.type === "ruleset") {
      cssStatement.selector = `${cssStatement.selector}:${modifier}`;
    }
    return cssStatement;
  },
};

export const scrollbar: GlobalModifier = {
  type: "global",
  fn: (cssStatement) => {
    if (cssStatement.type === "ruleset") {
      cssStatement.selector = `${cssStatement.selector}::-webkit-scrollbar`;
    }
    return cssStatement;
  },
};

export const scrollbarTrack: GlobalModifier = {
  type: "global",
  fn: (cssStatement) => {
    if (cssStatement.type === "ruleset") {
      cssStatement.selector =
        `${cssStatement.selector}::-webkit-scrollbar-track`;
    }
    return cssStatement;
  },
};

export const scrollbarThumb: GlobalModifier = {
  type: "global",
  fn: (cssStatement) => {
    if (cssStatement.type === "ruleset") {
      cssStatement.selector =
        `${cssStatement.selector}::-webkit-scrollbar-thumb`;
    }
    return cssStatement;
  },
};
