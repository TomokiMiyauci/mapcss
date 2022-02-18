import { reBracket_$ } from "../../core/utils/regexp.ts";
import type { EntriesSpecifier } from "../../core/types.ts";

export const flex: EntriesSpecifier = [
  ["DEFAULT", { display: "flex" }],
  [1, { flex: "1 1 0%" }],
  ["auto", { flex: "1 1 auto" }],
  ["initial", { flex: "0 1 auto" }],
  ["none", { flex: "none" }],
  ["row", {
    DEFAULT: { "flex-direction": "row" },
    reverse: { "flex-direction": "row-reverse" },
  }],
  ["col", {
    DEFAULT: { "flex-direction": "column" },
    reverse: { "flex-direction": "column-reverse" },
  }],
  ["wrap", {
    DEFAULT: { "flex-wrap": "wrap" },
    reverse: { "flex-wrap": "wrap-reverse" },
  }],
  ["nowrap", { "flex-wrap": "nowrap" }],
  [reBracket_$, ([, arbitrary]) => ({ flex: arbitrary })],
];
