import { reBracket_$ } from "../../core/utils/regexp.ts";
import type { EntriesIdentifier } from "../../core/types.ts";

export const list: EntriesIdentifier = [
  ["item", { display: "list-item" }],
  ["none", { "list-style-type": "none" }],
  ["disc", { "list-style-type": "disc" }],
  ["decimal", { "list-style-type": "decimal" }],
  ["inside", { "list-style-position": "inside" }],
  ["outside", { "list-style-position": "outside" }],
  [reBracket_$, ([, attr]) => ({ "list-style-position": attr })],
];
