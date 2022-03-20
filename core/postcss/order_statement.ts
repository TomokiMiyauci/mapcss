import { isAtRule, isDeclaration, isRule } from "../utils/assert.ts";
import type { PostcssPlugin } from "../deps.ts";

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
          const aDecl = a.nodes.filter(isDeclaration);
          const bDecl = b.nodes.filter(isDeclaration);

          const result = desc(
            aDecl.length,
            bDecl.length,
          );

          if (result) {
            return result;
          } else {
            const aVariables = aDecl.filter(({ variable }) => variable);
            const bVariables = bDecl.filter(({ variable }) => variable);
            return desc(aVariables.length, bVariables.length);
          }
        }
        if (a.type === b.type) {
          return 0;
        }
        if (isAtRule(a)) {
          return 1;
        } else if (isAtRule(b)) {
          return -1;
        }
        return 0;
      });
    },
  };
}

plugin.postcss = true;
export default plugin;
