import { cssMap } from "./identifier/mod.ts";
import { theme } from "./theme/mod.ts";
import { createModifierMap } from "./modifier/mod.ts";
import { twBasicSyntax } from "./syntax.ts";
import { twCustomPropertyInjector } from "./processor.ts";
import { sortMediaQueries } from "./postcss.ts";
import type { Preset } from "../core/types.ts";
import type { Option } from "./types.ts";

export function preset(
  { injectVariable = true, darkMode = "media" }: Readonly<Partial<Option>> = {},
): Preset {
  return {
    name: "mapcss/preset_tw",
    fn: () => ({
      cssMap,
      theme,
      modifierMap: createModifierMap(darkMode),
      syntax: [twBasicSyntax],
      preProcess: injectVariable ? [twCustomPropertyInjector] : [],
      postcssPlugin: [sortMediaQueries()],
    }),
  };
}
