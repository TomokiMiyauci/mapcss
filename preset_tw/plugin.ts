import { specifierMap } from "./specifier/mod.ts";
import { theme } from "./theme/mod.ts";
import { modifierMap } from "./modifier/mod.ts";
import { twBasicSyntax } from "./syntax.ts";
import { twCustomPropertyInjector } from "./processor.ts";
import type { Preset } from "../core/types.ts";

export interface PresetMiniOptions {
  /**
   * @default 'map-'
   */
  variablePrefix?: string;
}

export function presetTw(_: PresetMiniOptions = {}): Preset {
  return {
    name: "mapcss/preset_tw",
    fn: () => ({
      specifierMap,
      theme,
      modifierMap,
      syntaxes: [twBasicSyntax],
      preProcess: [twCustomPropertyInjector],
    }),
  };
}
