import { recTransform } from "../preset_typography/specifier/prose.ts";
import { twBasicSyntax } from "../preset_tw/syntax.ts";
import type { BinaryTree, Preset, SpecifierMap } from "../core/types.ts";
import { createCSSObject } from "./specifier.ts";

export type PresetOptions = {
  svgMap: BinaryTree<string>;
};

export function preset({ svgMap }: PresetOptions): Preset {
  const specifier = recTransform(
    svgMap,
    (svg) => createCSSObject(svg as string),
  );
  const specifierMap: SpecifierMap = { i: specifier };
  const preset: Preset = {
    name: "mapcss/preset-icon",
    fn: () => ({
      specifierMap,
      syntax: [twBasicSyntax],
    }),
  };
  return preset;
}
