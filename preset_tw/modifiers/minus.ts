import { mapEntries } from "../../deps.ts";
import type { LocalModifier } from "../../core/types.ts";

export const $minus: LocalModifier = {
  type: "local",
  fn: (declaration) => {
    return mapEntries(
      declaration,
      ([key, value]) => [key, `-${value}`],
    );
  },
};
