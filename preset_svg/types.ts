// This module is browser compatible.

import type { Tree } from "../core/types.ts";

export type SVGMap = Tree<string>;
export type ColorMode = "static" | "dynamic" | "auto";

export type Option = {
  /** Extend or disable default declaration block */
  declaration?: Record<string, string | number>;

  /**
   * Color mode of generated CSS.
   *
   * - `static` - colors are static. use as background image
   * - `dynamic` - colors can be changed. use background color and the `mask` property for monochrome SVG icons.
   * - `auto` - Whether or not the `currentColor` attribute is included determines the mode between `static` and `dynamic`.
   *
   * @default 'auto'
   *
   * @credit
   * This feature was inspired by [unocss/preset-icons](https://github.com/unocss/unocss/tree/main/packages/preset-icons#modes-overriding)
   */
  colorMode?: ColorMode;
};
