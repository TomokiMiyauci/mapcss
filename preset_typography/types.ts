import type { BinaryTree } from "../core/types.ts";

export type PresetOptions = {
  /**
   * Extend or overwrite default style.
   *
   * @default undefined
   */
  css?: BinaryTree<string | number | false>;
};
