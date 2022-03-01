import { cssMap } from "./identifier/mod.ts";
import { theme } from "./theme/mod.ts";
import { modifierMap } from "./modifier/mod.ts";
import { twBasicSyntax } from "./syntax.ts";
import { twCustomPropertyInjector } from "./processor.ts";
import { sortMediaQueries } from "./postcss.ts";
import type { Preset } from "../core/types.ts";
import type { Option } from "./types.ts";

export function preset(
  { injectVariable = true }: Readonly<Partial<Option>> = {
    preflight: false,
    injectVariable: true,
  },
): Preset {
  return {
    name: "mapcss/preset_tw",
    fn: () => ({
      cssMap,
      theme,
      modifierMap,
      syntax: [twBasicSyntax],
      preProcess: injectVariable ? [twCustomPropertyInjector] : [],
      postcssPlugin: [sortMediaQueries()],
    }),
  };
}
