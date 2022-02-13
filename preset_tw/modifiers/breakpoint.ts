import type { GlobalModifier } from "./../../core/types.ts";

const smAtRule = "@media (min-width: 640px)";
const mdAtRule = "@media (min-width: 768px)";
const lgAtRule = "@media (min-width: 1024px)";
const xlAtRule = "@media (min-width: 1280px)";
const $2xlAtRule = "@media (min-width: 1536px)";

export const sm: GlobalModifier = {
  type: "global",
  fn: () => {
    return {
      atRule: smAtRule,
      order: 1,
    };
  },
};

export const md: GlobalModifier = {
  type: "global",
  fn: () => ({
    atRule: mdAtRule,
    order: 2,
  }),
};

export const lg: GlobalModifier = {
  type: "global",
  fn: () => ({
    atRule: lgAtRule,
    order: 3,
  }),
};

export const xl: GlobalModifier = {
  type: "global",
  fn: () => {
    return {
      atRule: xlAtRule,
      order: 4,
    };
  },
};

export const $2xl: GlobalModifier = {
  type: "global",
  fn: () => ({
    atRule: $2xlAtRule,
    order: 5,
  }),
};
