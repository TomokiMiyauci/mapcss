import type { BinaryTree } from "../core/types.ts";
export type Option = {
  svgMap: BinaryTree<string>;

  /** Extend or disable default declaration block */
  declaration?: Record<string, string | number>;
};
