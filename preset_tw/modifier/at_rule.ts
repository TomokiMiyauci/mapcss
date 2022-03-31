// This module is browser compatible.

import { isAtRule, isRule } from "../../core/utils/assert.ts";
import { AtRule } from "../deps.ts";
import type { Modifier } from "./../../core/types.ts";

export function createMedia(params: string): Modifier {
  return (root) => {
    root.walk((node) => {
      if (isAtRule(node) || isRule(node)) {
        const atRule = new AtRule({
          name: "media",
          params,
          nodes: [node],
        });
        node.replaceWith(atRule);
      }
    });
    return root;
  };
}
