import type { Rule } from "../../core/types.ts";

const BORDER_COLLAPSE = "border-collapse";

export const borderCollapses: Rule[] = [
  ["border-collapse", {
    [BORDER_COLLAPSE]: "collapse",
  }],
  ["border-separate", {
    [BORDER_COLLAPSE]: "separate",
  }],
];
