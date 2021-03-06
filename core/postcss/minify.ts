// This module is browser compatible.

import {
  PostcssPlugin,
  selectorParser,
  SyncProcessor,
  valueParser,
} from "../deps.ts";

const processor: SyncProcessor = (selectors) => {
  selectors.walk((selector) => {
    selector.spaces = { before: "", after: "" };
  });
};

export function minifySelector(value: string): string {
  const selectorProcessor = selectorParser(processor);

  return selectorProcessor.processSync(value, {});
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
      // If custom variable of declaration value is ` `, keep it
      decl.raws = {
        before: "",
        between: decl.variable && !decl.value ? ": " : ":",
        value: decl.raws.value,
      };
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
