import { propertyMap } from "./mod.ts";
import type { Preset } from "../core/types.ts";
export interface PresetMiniOptions {
  variablePrefix?: string;
}

export function presetMini(_: PresetMiniOptions = {}): Preset {
  return {
    name: "mapcss/preset_mini",
    propertyMap,
  };
}
