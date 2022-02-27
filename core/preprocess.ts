import type { BinaryTree, PreProcessor } from "./types.ts";
import { astify } from "./ast.ts";

export function createInjectCSS(
  css: BinaryTree<string | number>,
): PreProcessor {
  return {
    name: "mapcss/inject-css-statement",
    fn: (root) => {
      const cssRoot = astify(css);
      root.prepend(cssRoot);
      return root;
    },
  };
}
