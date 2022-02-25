import selectorParser from "https://esm.sh/postcss-selector-parser";
import valueParser from "https://esm.sh/postcss-value-parser";
import type { PostcssPlugin } from "../../deps.ts";

const selectorProcessor = selectorParser((selectors) => {
  selectors.walk((selector) => {
    selector.spaces = { before: "", after: "" };
  });
});

export function minifySelector(value: string): string {
  return selectorProcessor.processSync(value);
}

function minifyValue(value: string): string {
  const parsed = valueParser(value.trim());
  parsed.walk((node) => {
    if (node.type === "div" || node.type === "function") {
      node.before = "";
      node.after = "";
    }
    if (node.type === "space") node.value = " ";
  });
  return parsed.toString();
}

function plugin(): PostcssPlugin {
  return {
    postcssPlugin: "postcss-minify",

    AtRule: (atrule) => {
      atrule.raws = { before: "", after: "", afterName: " " };
      atrule.params = minifyValue(atrule.params);
    },

    Comment: (comment) => {
      if (comment.text[0] === "!") {
        comment.raws.before = "";
        comment.raws.after = "";
      } else {
        comment.remove();
      }
    },

    Declaration: (decl) => {
      decl.raws = { before: "", between: ":", value: decl.raws.value };
      decl.value = minifyValue(decl.value);
    },

    Rule: (rule) => {
      rule.raws = { before: "", between: "", after: "", semicolon: false };
      rule.selector = minifySelector(rule.selector);
    },

    OnceExit: (css) => {
      css.raws.after = "";
    },
  };
}

plugin.postcss = true;
export default plugin;
