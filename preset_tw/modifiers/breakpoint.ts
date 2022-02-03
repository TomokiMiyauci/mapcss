import type { ModifierHandler } from "./../../core/types.ts";

export const sm: ModifierHandler = () => ({
  ruleSet: (ruleset) => `@media (min-width: 640px) {\n${ruleset}\n}`,
});

export const md: ModifierHandler = () => ({
  ruleSet: (ruleset) => `@media (min-width: 768px) {\n${ruleset}\n}`,
});

export const lg: ModifierHandler = () => ({
  ruleSet: (ruleset) => `@media (min-width: 1024px) {\n${ruleset}\n}`,
});

export const xl: ModifierHandler = () => ({
  ruleSet: (ruleset) => `@media (min-width: 1280px) {\n${ruleset}\n}`,
});

export const $2xl: ModifierHandler = () => ({
  ruleSet: (ruleset) => `@media (min-width: 1536px) {\n${ruleset}\n}`,
});
