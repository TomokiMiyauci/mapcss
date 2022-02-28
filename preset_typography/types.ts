import type { BinaryTree } from "../core/types.ts";

export type PresetOption = {
  /** The class name to use the typographic utilities.
   * @default `prose`
   */
  className: string;

  /**
   * Extend or overwrite default style.
   *
   * @default undefined
   */
  css: BinaryTree<string | number | false>;
};
