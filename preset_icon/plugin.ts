import { recTransform } from "../preset_typography/identifier/prose.ts";
import type { BinaryTree, IdentifierMap, Preset } from "../core/types.ts";
import { createCSSObject } from "./identifier.ts";

export type PresetOptions = {
  svgMap: BinaryTree<string>;
};

export function preset({ svgMap }: PresetOptions): Preset {
  const identifier = recTransform(
    svgMap,
    (svg) => createCSSObject(svg as string),
  );
  const identifierMap: IdentifierMap = { i: identifier };
  const preset: Preset = {
    name: "mapcss/preset-icon",
    fn: () => ({
      identifierMap,
    }),
  };
  return preset;
}
