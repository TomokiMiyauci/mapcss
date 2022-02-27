import { cssMap } from "./identifier/mod.ts";
import { theme } from "./theme/mod.ts";
import { modifierMap } from "./modifier/mod.ts";
import { twBasicSyntax } from "./syntax.ts";
import { twCustomPropertyInjector } from "./processor.ts";
import type { Preset } from "../core/types.ts";

export type Option = {
  /** Inject reset CSS Statement or not.
   * @default false
   */
  preflight: boolean;

  /** Inject universal custom property(variable) or not.
   * In default, it inspects the declaration block and automatically injects variable globally.
   * @default true
   */
  injectVariable: boolean;
};

export function presetTw(
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
    }),
  };
}
