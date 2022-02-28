import { dependency } from "./identifier/mod.ts";
import { theme } from "../preset_tw/mod.ts";
import type { Preset } from "../core/types.ts";
import type { PresetOption } from "./types.ts";

const DEFAULT_CLASS_NAME = "prose";

export function plugin(
  { css = {}, className = DEFAULT_CLASS_NAME }: Readonly<
    Partial<PresetOption>
  > = {
    className: DEFAULT_CLASS_NAME,
  },
): Preset {
  return {
    name: "mapcss/preset_typography",
    fn: () => ({
      // Currently, it is not possible to inject context for each preset. This is subject to change in the future.
      cssMap: dependency({ css, className }),
      theme,
    }),
  };
}
