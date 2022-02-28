import { recTransform } from "../preset_typography/identifier/prose.ts";
import type { BinaryTree, CSSMap, Preset } from "../core/types.ts";
import { createCSSObject } from "./identifier.ts";

export type PresetOptions = {
  svgMap: BinaryTree<string>;
};

export function preset({ svgMap }: PresetOptions): Preset {
  const identifier = recTransform(
    svgMap,
    (svg) => createCSSObject(svg as string),
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
