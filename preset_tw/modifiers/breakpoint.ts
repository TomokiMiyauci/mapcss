import type { GlobalModifier } from "./../../core/types.ts";

export const sm: GlobalModifier = {
  type: "global",
  fn: () => ({
    ruleSet: (ruleSet) => `@media (min-width: 640px) {\n${ruleSet}\n}`,
  }),
};

export const md: GlobalModifier = {
  type: "global",
  fn: () => ({
    ruleSet: (ruleSet) => `@media (min-width: 768px) {\n${ruleSet}\n}`,
  }),
};

export const lg: GlobalModifier = {
  type: "global",
  fn: () => ({
    ruleSet: (ruleSet) => `@media (min-width: 1024px) {\n${ruleSet}\n}`,
  }),
};

export const xl: GlobalModifier = {
  type: "global",
  fn: () => ({
    ruleSet: (ruleSet) => `@media (min-width: 1280px) {\n${ruleSet}\n}`,
  }),
};

export const $2xl: GlobalModifier = {
  type: "global",
  fn: () => ({
    ruleSet: (ruleSet) => `@media (min-width: 1536px) {\n${ruleSet}\n}`,
  }),
};
