import { reBracket_$ } from "../../core/utils/regexp.ts";
import type { EntriesSpecifier } from "../../core/types.ts";
export const content: EntriesSpecifier = [
  ["none", { content: "none" }],
  ["center", { "align-content": "center" }],
  ["start", { "align-content": "flex-start" }],
  ["end", { "align-content": "flex-end" }],
  ["between", { "align-content": "space-between" }],
  ["around", { "align-content": "space-around" }],
  ["evenly", { "align-content": "space-evenly" }],
  [reBracket_$, ([, content]) => ({ content })],
];
