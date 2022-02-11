import type { GlobalModifier } from "./../../core/types.ts";

export const pseudo: GlobalModifier = {
  type: "global",
  fn: (_, { modifier }) => ({
    pseudo: `:${modifier}`,
  }),
};

export const scrollbar: GlobalModifier = {
  type: "global",
  fn: () => ({
    pseudo: `::-webkit-scrollbar`,
  }),
};

export const scrollbarTrack: GlobalModifier = {
  type: "global",
  fn: () => ({
    pseudo: `::-webkit-scrollbar-track`,
  }),
};

export const scrollbarThumb: GlobalModifier = {
  type: "global",
  fn: () => ({
    pseudo: `::-webkit-scrollbar-thumb`,
  }),
};
