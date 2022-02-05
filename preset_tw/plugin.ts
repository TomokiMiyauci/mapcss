import { mapperMap } from "./mapper/mod.ts";
import { theme } from "./theme/mod.ts";
import { modifierMap } from "./modifiers/mod.ts";
import type { Preset } from "../core/types.ts";

export interface PresetMiniOptions {
  variablePrefix?: string;
}

export function presetTw(_: PresetMiniOptions = {}): Preset {
  return {
    name: "mapcss/preset_tw",
    mapperMap,
    theme,
    modifierMap,
  };
}
