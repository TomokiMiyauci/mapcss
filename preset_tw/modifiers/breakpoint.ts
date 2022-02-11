import type { GlobalModifier } from "./../../core/types.ts";

export const sm: GlobalModifier = {
  type: "global",
  fn: () => ({
    atRule: `@media (min-width: 640px)`,
  }),
};

export const md: GlobalModifier = {
  type: "global",
  fn: () => ({
    atRule: `@media (min-width: 768px)`,
  }),
};

export const lg: GlobalModifier = {
  type: "global",
  fn: () => ({
    atRule: `@media (min-width: 1024px)`,
  }),
};

export const xl: GlobalModifier = {
  type: "global",
  fn: () => ({
    atRule: `@media (min-width: 1280px)`,
  }),
};

export const $2xl: GlobalModifier = {
  type: "global",
  fn: () => ({
    atRule: `@media (min-width: 1536px)`,
  }),
};
