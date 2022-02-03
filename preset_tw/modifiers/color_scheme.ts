import type { GlobalModifier } from "./../../core/types.ts";

export const dark: GlobalModifier = {
  type: "global",
  fn: ({ selector }, { modifier }) => ({
    selector: `.${modifier} ${selector}`,
  }),
};
