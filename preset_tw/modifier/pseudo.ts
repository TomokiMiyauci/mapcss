import type { Modifier } from "./../../core/types.ts";

export const scrollbar: Modifier = (parent) => {
  parent.walkRules((rule) => {
    rule.selector = `${rule.selector}::-webkit-scrollbar`;
  });
  return parent;
};

export const scrollbarTrack: Modifier = (parent) => {
  parent.walkRules((rule) => {
    rule.selector = `${rule.selector}::-webkit-scrollbar-track`;
  });
  return parent;
};

export const scrollbarThumb: Modifier = (parent) => {
  parent.walkRules((rule) => {
    rule.selector = `${rule.selector}::-webkit-scrollbar-thumb`;
  });
  return parent;
};
