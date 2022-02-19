import type { LocalModifier } from "../../core/types.ts";

export const $minus: LocalModifier = {
  type: "local",
  fn: (declarations) =>
    declarations.map(({ property, value }) => ({
      property,
      value: `-${value}`,
    })),
};
