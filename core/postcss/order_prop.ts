// This module is browser compatible.
import type { PostcssPlugin } from "../deps.ts";

function plugin(): PostcssPlugin {
  return {
    postcssPlugin: "postcss-order-prop",

    OnceExit: (css) => {
      css.walkRules((rule) => {
        rule.nodes.sort((a, b) => {
          if (a.type === "decl" && b.type === "decl") {
            if (a.prop > b.prop) {
              return 1;
            }
            if (b.prop > a.prop) {
              return -1;
            }
          }
          return 0;
        });
      });
    },
  };
}

plugin.postcss = true;
export default plugin;
