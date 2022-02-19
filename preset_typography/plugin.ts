import { specifierMap } from "./specifier/mod.ts";
import { twBasicSyntax } from "../preset_tw/syntax.ts";
import type { Preset } from "../core/types.ts";

export interface PresetOptions {
  /**
   * @default 'map-'
   */
  variablePrefix?: string;
}

export function presetTypography(_: PresetOptions = {}): Preset {
  return {
    name: "mapcss/preset_typography",
    specifierMap,
    syntaxes: [twBasicSyntax],
    theme: {},
    modifierMap: {},
    "postProcessor": [],
  };
}
