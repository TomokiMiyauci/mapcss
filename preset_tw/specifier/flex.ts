import type { Specifier } from "../../core/types.ts";

export const flex: Specifier = [
  ["DEFAULT", { display: "flex" }],
  [1, { flex: "1 1 0%" }],
  ["auto", { flex: "1 1 auto" }],
  ["initial", { flex: "0 1 auto" }],
  ["none", { flex: "none" }],
  ["row", {
    "DEFAULT": { "flex-direction": "row" },
    reverse: { "flex-direction": "row-reverse" },
  }],
  ["col", {
    "DEFAULT": { "flex-direction": "column" },
    reverse: { "flex-direction": "column-reverse" },
  }],
  ["wrap", {
    "DEFAULT": { "flex-wrap": "wrap" },
    "reverse": { "flex-wrap": "wrap-reverse" },
  }],
  ["nowrap", { "flex-wrap": "nowrap" }],
];
