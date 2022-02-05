import type { Specifier } from "../../core/types.ts";

export const flex: Specifier = [
  ["DEFAULT", { display: "flex" }],
  [1, { flex: "1 1 0%" }],
  ["auto", { flex: "1 1 auto" }],
  ["initial", { flex: "0 1 auto" }],
  ["none", { flex: "none" }],
];
