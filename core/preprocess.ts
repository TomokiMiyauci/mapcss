import type { BinaryTree, PreProcessor } from "./types.ts";
import { toAST } from "../deps.ts";

export function createInjectCSS(
  css: BinaryTree<string | number>,
): PreProcessor {
  return {
    name: "mapcss/inject-css-statement",
    fn: (root) => {
      const cssRoot = toAST(css);
      root.prepend(cssRoot);
      return root;
    },
  };
}
