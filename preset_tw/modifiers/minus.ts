import { mapEntries } from "../../deps.ts";
import type { LocalModifier } from "../../core/types.ts";

export const $minus: LocalModifier = {
  type: "local",
  fn: (cssObject) => {
    return mapEntries(
      cssObject,
      ([key, value]) => [key, `-${value}`],
    );
  },
};
