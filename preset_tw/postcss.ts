import type { AtRule, PostcssPlugin } from "./deps.ts";
import { orderMediaQuery } from "./deps.ts";

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

      cache.sort((a, b) => orderMediaQuery(a.params, b.params));
      cache.forEach((atRule) => {
        root.append(atRule);
      });
    },
  };
}

sortMediaQueries.postcss = true;

export { sortMediaQueries };
