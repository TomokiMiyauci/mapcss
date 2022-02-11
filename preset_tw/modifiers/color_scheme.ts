import type { GlobalModifier } from "./../../core/types.ts";

export const dark: GlobalModifier = {
  type: "global",
  fn: ({ basicSelector }, { modifier }) => {
    return { basicSelector: `.${modifier} ${basicSelector}` };
  },
};
