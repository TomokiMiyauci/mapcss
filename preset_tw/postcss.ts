import type { AtRule, PostcssPlugin } from "../deps.ts";
import mobileOrder from "https://esm.sh/sort-css-media-queries@2.0.4?pin=v66";

function sortMediaQueries(): PostcssPlugin {
  return {
    postcssPlugin: "postcss-sort-media-queries",
    OnceExit(root) {
      const cache: AtRule[] = [];
      root.walkAtRules("media", (atRule) => {
        cache.push(atRule.clone());

        atRule.remove();
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
