import { dependency } from "./specifier/mod.ts";
import { twBasicSyntax } from "../preset_tw/syntax.ts";
import { theme } from "../preset_tw/mod.ts";
import type { Preset } from "../core/types.ts";
import type { PresetOptions } from "./types.ts";

export function plugin({ css }: PresetOptions = {}): Preset {
  return {
    name: "mapcss/preset_typography",
    // Currently, it is not possible to inject context for each preset. This is subject to change in the future.
    specifierMap: dependency({ css }),
    syntaxes: [twBasicSyntax],
    theme,
    modifierMap: {},
    postProcessor: [],
  };
}