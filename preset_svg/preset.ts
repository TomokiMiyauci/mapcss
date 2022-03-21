import { recTransform } from "../utils/recursive.ts";
import type { CSSMap, Preset } from "../core/types.ts";
import { createCSSObject } from "./identifier.ts";

import type { Option } from "./types.ts";

export function preset(
  { declaration = {}, colorMode = "auto", svgMap }: Readonly<Option>,
): Preset {
  const identifier = recTransform(
    svgMap,
    (svg) => createCSSObject(svg as string, { declaration, colorMode }),
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
