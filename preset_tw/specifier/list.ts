import type { Specifier } from "../../core/types.ts";

export const list: Specifier = [
  ["item", { display: "list-item" }],
  ["none", { "list-style-type": "none" }],
  ["disc", { "list-style-type": "disc" }],
  ["decimal", { "list-style-type": "decimal" }],
  ["inside", { "list-style-position": "inside" }],
  ["outside", { "list-style-position": "outside" }],
];
