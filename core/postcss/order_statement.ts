import { isDeclaration, isRule } from "../utils/assert.ts";
import type { PostcssPlugin } from "../../deps.ts";

function desc<T extends number | string, U extends T = T>(a: T, b: U): number {
  if (a < b) {
    return 1;
  } else if (a > b) {
    return -1;
  }
  return 0;
}

/** PostCSS plugin for CSS Statement */
function plugin(): PostcssPlugin {
  return {
    postcssPlugin: "mapcss/postcss-order-statement",
    OnceExit: (root) => {
      root.nodes.sort((a, b) => {
        if (isRule(a) && isRule(b)) {
          return desc(
            a.nodes.filter(isDeclaration).length,
            b.nodes.filter(isDeclaration).length,
          );
        }
        return 0;
      });
    },
  };
}

plugin.postcss = true;
export default plugin;
