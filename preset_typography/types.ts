import type { BinaryTree } from "../core/types.ts";

export interface PresetOptions {
  /**
   * Extend or override CSS Statement.
   *
   * @default undefined
   */
  css?: BinaryTree<string | number | false>;
}
