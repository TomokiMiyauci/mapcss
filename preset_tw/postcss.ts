import type { AtRule, PostcssPlugin } from "../deps.ts";
import { mobileOrder } from "./deps.ts";

function sortMediaQueries(): PostcssPlugin {
  return {
    postcssPlugin: "postcss-sort-media-queries",
    OnceExit(root) {
      const cache: AtRule[] = [];

      root.each((node) => {
        if (node.type === "atrule" && node.name === "media") {
          cache.push(node.clone());

          node.remove();
        }
      });

      cache.sort((a, b) => mobileOrder(a.params, b.params));
      cache.forEach((atRule) => {
        root.append(atRule);
      });
    },
  };
}

sortMediaQueries.postcss = true;

export { sortMediaQueries };
