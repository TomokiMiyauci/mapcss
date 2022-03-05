import { recTransform } from "../preset_typography/identifier/prose.ts";
import type { CSSMap, Preset } from "../core/types.ts";
import { createCSSObject } from "./identifier.ts";
import type { Option } from "./types.ts";

export function preset(
  { svgMap, declaration = {} }: Readonly<Option>,
): Preset {
  const identifier = recTransform(
    svgMap,
    (svg) => createCSSObject(svg as string, { declaration }),
  );
  const cssMap: CSSMap = { i: identifier };
  const preset: Preset = {
    name: "mapcss/preset-icon",
    fn: () => ({
      cssMap,
    }),
  };
  return preset;
}
