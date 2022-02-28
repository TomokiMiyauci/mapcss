import { dependency } from "./identifier/mod.ts";
import { theme } from "../preset_tw/mod.ts";
import type { Preset } from "../core/types.ts";
import type { PresetOptions } from "./types.ts";

export function plugin({ css }: PresetOptions = {}): Preset {
  return {
    name: "mapcss/preset_typography",
    fn: () => ({
      // Currently, it is not possible to inject context for each preset. This is subject to change in the future.
      cssMap: dependency({ css }),
      theme,
    }),
  };
}
