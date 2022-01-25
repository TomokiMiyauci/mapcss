import { nestedRules } from "./rules/mod.ts";
import { theme } from "./theme/mod.ts";
import type { Preset } from "../core/types.ts";
export interface PresetMiniOptions {
  variablePrefix?: string;
}

export function presetMini(_: PresetMiniOptions = {}): Preset {
  return {
    name: "mapcss/preset_mini",
    rules: nestedRules.flat(1),
    theme,
  };
}
