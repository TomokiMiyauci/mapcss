import { recTransform } from "../preset_typography/identifier/prose.ts";
import type { BinaryTree, CSSMap, Preset } from "../core/types.ts";
import { createCSSObject } from "./identifier.ts";

export type PresetOptions = {
  svgMap: BinaryTree<string>;

  /** Extend or disable default declaration block */
  declaration?: Record<string, string | number>;
};

export function preset({ svgMap, declaration = {} }: PresetOptions): Preset {
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
