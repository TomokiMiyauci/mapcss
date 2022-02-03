import type { GlobalModifier } from "./../../core/types.ts";

export const pseudo: GlobalModifier = {
  type: "global",
  fn: ({ selector }, { modifier }) => ({
    selector: `${selector}:${modifier}`,
  }),
};

export const scrollbar: GlobalModifier = {
  type: "global",
  fn: ({ selector }) => ({
    selector: `${selector}::-webkit-scrollbar`,
  }),
};
